var app = {
	init: function()
	{
		this.cacheDom();
		this.bind();
	},

	cacheDom: function()
	{
		this.$main = $("main");
		this.$nextScreenBtn = this.$main.find(".next");
		this.$editScreenBtn = this.$main.find(".back");

		this.$chooseScreen = this.$main.find("#choose");
		this.$seePreviewBtn = this.$chooseScreen.find(".btn");
		this.$chooseGenderBtn = this.$chooseScreen.find(".characters button");

		this.characters = [];
	},

	bind: function()
	{
		$(window).on("load", function()
		{
			$("aside")
				.slideUp(500)
				.parent()
				.find("main #home img")
				.animate({"bottom": 0}, 1000)
				.parent()
				.find(".info")
				.fadeIn(1000);
		});

		this.$nextScreenBtn.on("click", this.nextScreen.bind(this));
		this.$editScreenBtn.on("click", this.editScreen.bind(this));
		this.$seePreviewBtn.on("click", this.seePreview.bind(this));

		this.$chooseGenderBtn.on("click", this.chooseGender.bind(this));

	},

	render: function()
	{
	},

	// ------------------ Extra Functions // Navigation

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

		this.addCharacter(
			{
				gender: genderId,
				age: "child",
				skin: "white",
				hair: 1,
				eyes: 1,
				nose: 1,
				mouth: 1
			}
		);
	},

	// ------------------ Extra Functions // Navigation

	addCharacter: function(obj){
		this.characters.push(obj);
		console.log(this.characters);
	},

	removeCharacter: function(){},

};

app.init();



///////////////////////////////////
