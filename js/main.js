var app = {

	init: function()
	{
		this.cacheDom();
		this.bind();
	},

	cacheDom: function()
	{
		this.$window = $(window);
		this.$main = $("main");

		this.actualBk = 1;
		this.maxBk = this.$main.find("#preview .mobile a").length;

		this.$nextScreenBtn = this.$main.find(".next");
		this.$editScreenBtn = this.$main.find(".back");

		this.$chooseScreen = this.$main.find("#choose");
		this.$seePreviewBtn = this.$chooseScreen.find(".btn");

		this.$chooseGenderBtn = this.$chooseScreen.find(".characters button");
		this.$chooseAttrBtn = this.$main.find(".tabPanel .controls button");
		this.$chooseAgeBtn = this.$main.find(".ageControls button");
		this.$chooseSkinBtn = this.$main.find(".tools .skin a");
		this.$chooseOtherBtn = this.$main.find(".tools img").not(".skin img");

		this.$choosePetBtn = this.$main.find("section.pet .tools .skin a");

		this.$chooseBkArrowsBtn = this.$main.find("#preview");
		this.$chooseBkLeftBtn = this.$chooseBkArrowsBtn.find("button.triangle-left");
		this.$chooseBkRightBtn = this.$chooseBkArrowsBtn.find("button.triangle-right");

		this.$chooseBkMobileBtn = this.$main.find("#preview .mobile a");

		this.$goBackChooseBtn = this.$main.find("button.add, button.cancel");

		this.characters = [];

	},

	bind: function()
	{
		this.$window.on("load", this.loading.bind(this));

		this.$nextScreenBtn.on("click", this.nextScreen.bind(this));
		this.$editScreenBtn.on("click", this.editScreen.bind(this));
		this.$seePreviewBtn.on("click", this.seePreview.bind(this));

		this.$chooseGenderBtn.on("click", this.chooseGender.bind(this));
		this.$chooseAttrBtn.on("click", this.chooseAttr.bind(this));
		this.$chooseAgeBtn.on("click", this.chooseAge.bind(this));
		this.$chooseSkinBtn.on("click", this.chooseSkin.bind(this));
		this.$chooseOtherBtn.on("click", this.chooseOther.bind(this));

		this.$choosePetBtn.on("click", this.choosePet.bind(this));
		this.$choosePetBtn.on("click", this.choosePet.bind(this));

		this.$chooseBkRightBtn.on("click", function(){this.navBackground(1)}.bind(this) );
		this.$chooseBkLeftBtn.on("click", function(){this.navBackground(-1)}.bind(this) );

		this.$chooseBkMobileBtn.on("click", this.chooseBkMobile.bind(this));

		this.$goBackChooseBtn.on("click", this.goBackChoose.bind(this));
	},

	// ------------------ Extra Functions // Navigation

	loading: function()
	{
		$("aside")
			.slideUp(500)
			.parent()
			.find("main #home img")
			.animate({"bottom": 0}, 1000)
			.parent()
			.find(".info")
			.fadeIn(1000);
	},

	hideScreen: function()
	{
		return this.$main
			.find("section.active")
			.removeClass("active");
	},

	nextScreen: function()
	{
		this.hideScreen()
			.next()
			.addClass("active");
	},

	editScreen: function()
	{
		this.hideScreen()
			.parent()
			.find("#choose")
			.addClass("active");
	},

	seePreview: function()
	{
		this.hideScreen()
			.parent()
			.find("#preview")
			.addClass("active");
	},

	chooseGender: function(event)
	{
		var genderId = event
			.currentTarget
			.className
			.split(" ")[0];

		var object = ".edit." + genderId + ".child";

		this.hideScreen()
			.parent()
			.find(object)
			.addClass("active");

		/*this.addCharacter(
			{
				gender: genderId,
				age: "child",
				skin: "white",
				hair: 1,
				eyes: 1,
				nose: 1,
				mouth: 1
			}
		);*/

		this.resetCharacters();
	},

	chooseAttr: function(event)
	{
		var obj = $(event.currentTarget);
		
		var sectionName = obj
			.attr("class")
			.split(" ")[0];

		var section = obj
			.parent()
			.parent()
			.find("." + sectionName);

		section
			.addClass("active")
			.siblings()
			.removeClass("active");

		obj
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	chooseAge: function(event)
	{
		this.resetCharacters();
		var obj = $(event.currentTarget);
		
		var age = obj
			.attr("class")
			.split(" ")[2],
		sex = obj
			.attr("class")
			.split(" ")[0];
	
		$(".edit." + age + "." + sex)
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	chooseSkin: function(event)
	{
		var obj = $(event.currentTarget);
		var number = obj
				.find("img")
				.attr("src")
				.split("/")
				.pop()
				.split("_")
				.pop(),
			edit = this.$main
				.find("section.active")
				.attr("class")
				.split(" ");

		$("."+edit[1]+"."+edit[2])
			.find(".avatar .skin")
			.attr("src", "img/characters/"+edit[1]+"/"+edit[2]+"/skin_" + number);

		obj
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	chooseOther: function(event)
	{
		var obj = $(event.currentTarget);

		var url = obj
				.attr("src"),
			name = obj
				.parent()
				.parent()
				.attr("class")
				.split(" ")[0],
			active = obj
				.parent();

		$(".avatar")
			.find( "." + name )
			.attr("src", url);

		active
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	choosePet: function(event)
	{
		var obj = $(event.currentTarget);
		
		var id = obj
			.find("img")
			.attr("src")
			.split("_pv.png")[0] + ".png";
	
		$(".pet")
			.find(".avatar .skin")
			.attr("src", id);
	},

	// ------------------ Extra Functions // Navigation

	/*addCharacter: function(obj){
		this.characters.push(obj);
	},

	removeCharacter: function(event){},*/

	goBackChoose:function(){
		var obj = $(event.currentTarget);
		obj
			.parent()
			.parent()
			.removeClass("active");

	this.$chooseScreen.addClass("active");
	},

	navBackground: function(number){
		this.actualBk += number;
		if(this.actualBk > this.maxBk ){ this.actualBk = 1; }
		if(this.actualBk < 1){ this.actualBk = this.maxBk; }
		$("#preview")
			.find(".compos .base")
			.attr("src", "img/background/bk_0" + this.actualBk + ".png");
	},

	resetCharacters: function(){
		var root = $(".edit .tools .tabs");

		var obj = ["hair" , "eyes", "nose", "mouth", "skin"];
		var age = ["old", "teen", "child"];

		for(kont in age)
		{
			for(k in obj)
			{
				$(".edit.female." + age[kont] + " .avatar ." + obj[k])
					.attr("src", "img/characters/female/" + age[kont] + "/" + obj[k] + "_01.png");
				$(".edit.male." + age[kont] + " .avatar ." + obj[k])
					.attr("src", "img/characters/male/" + age[kont] + "/" + obj[k] + "_01.png");
			}
		}

		$(".edit")
			.find(".tools .tabs a")
			.removeClass("active");
	},

	chooseBkMobile: function(event){
		var obj = $(event.currentTarget);

		obj
			.addClass("active")
			.siblings()
			.removeClass("active");
	}

};

app.init();

////////////////////////////////////////////////////