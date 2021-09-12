import './stylesheets/application.scss';
import * as $ from "jquery";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const app = {

	init: function () {
		this.cacheDom();
		this.bind();
	},

	cacheDom: function () {
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

	bind: function () {
		this.$window.on("load", this.loading.bind(this));

		this.$nextScreenBtn.on("click", this.nextScreen.bind(this));
		this.$editScreenBtn.on("click", this.editScreen.bind(this));
		this.$seePreviewBtn.on("click", this.seePreview.bind(this));

		this.$chooseGenderBtn.on("click", this.chooseGender.bind(this));
		this.$chooseAttrBtn.on("click", this.chooseAttr.bind(this));
		this.$chooseAgeBtn.on("click", this.chooseAge.bind(this));
		this.$chooseSkinBtn.on("click", this.chooseSkin.bind(this));
		this.$chooseOtherBtn.on("click", this.chooseOther.bind(this));

		this.$choosePetBtn.on("click", this.chooseSkin.bind(this));
		this.$choosePetBtn.on("click", this.chooseSkin.bind(this));

		this.$chooseBkRightBtn.on("click", function () { this.navBackground(1) }.bind(this));
		this.$chooseBkLeftBtn.on("click", function () { this.navBackground(-1) }.bind(this));

		this.$chooseBkMobileBtn.on("click", this.chooseBkMobile.bind(this));

		this.$goBackChooseBtn.on("click", this.goBackChoose.bind(this));
	},

	// ------------------ Extra Functions // Navigation

	loading: function () {
		$("aside")
			.slideUp(500)
			.parent()
			.find("main #home img")
			.animate({ "bottom": 0 }, 1000)
			.parent()
			.find(".info")
			.fadeIn(1000);
	},

	hideScreen: function () {
		return this.$main
			.find("section.active")
			.removeClass("active");
	},

	nextScreen: function () {
		this.hideScreen()
			.next()
			.addClass("active");
	},

	editScreen: function () {
		this.hideScreen()
			.parent()
			.find("#choose")
			.addClass("active");
	},

	seePreview: function () {
		this.hideScreen()
			.parent()
			.find("#preview")
			.addClass("active");
	},

	chooseGender: function (event: any) {
		const genderId = event
			.currentTarget
			.className
			.split(" ")[0];

		const object = ".edit." + genderId + ".child";

		this.hideScreen()
			.parent()
			.find(object)
			.addClass("active");

		this.resetCharacters();
	},

	chooseAttr: function (event: any) {
		const obj = $(event.currentTarget);

		const sectionName = obj
			.attr("class")
			.split(" ")[0];

		const section = obj
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

	chooseAge: function (event: any) {
		this.resetCharacters();
		const obj = $(event.currentTarget);

		const age = obj
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

	chooseSkin: function (event: any) {
		const obj = $(event.currentTarget);
		const index = obj.index();

		$(document.querySelectorAll(".edit.active .box.avatar > .skin")[index - 1])
			.addClass('active')
			.siblings()
			.removeClass('active');

		obj
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	chooseOther: function (event: any) {
		const obj = $(event.currentTarget);

		const url = obj
			.attr("src"),
			name = obj
				.parent()
				.parent()
				.attr("class")
				.split(" ")[0],
			active = obj
				.parent();

		$(".avatar")
			.find("." + name)
			.attr("src", url);

		active
			.addClass("active")
			.siblings()
			.removeClass("active");
	},

	// ------------------ Extra Functions // Navigation

	goBackChoose: function () {
		const obj = $(event.currentTarget);
		obj
			.parent()
			.parent()
			.removeClass("active");

		this.$chooseScreen.addClass("active");
	},

	navBackground: function (number: number) {
		const index = $("#preview .compos img.active").index();
		const obj = document.querySelectorAll("#preview .compos img");
		if (obj[index + number]) {
			obj[index].className = "";
			obj[index + number].className = "active";
		}
	},

	resetCharacters: function () {
		document.querySelectorAll('section.edit .avatar img:not(.skin)').forEach((item: HTMLImageElement) => {
			item.src = "";
		});

		document.querySelectorAll('section.edit .tools .tabs a').forEach(item => {
			item.className = "";
		});
	},

	chooseBkMobile: function (event: any) {
		const obj = $(event.currentTarget);

		obj
			.addClass("active")
			.siblings()
			.removeClass("active");
	}

};

app.init();