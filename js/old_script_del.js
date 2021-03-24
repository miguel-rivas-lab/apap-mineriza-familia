var translateX =
{
	1 : 340,
	2 : 300,
	3 : 250,
	4 : 180,
	5 : 160,
	6 : 120,
	7 : 80,
	8 : 30
};

var background = ["bk_01.png", "bk_02.png", "bk_03.png"];
var separation = 90;
var characters, numberOfPeople;

var checkSize = function(gender, age)
{
	var characters = $("#preview").find(".ch");
	var numberOfPeople = characters.length;
	var position = (age == "old") ? "back" : "front";

	//no se pueden agregar más de 8 personajes
	if(numberOfPeople < 8)
	{
		$("#preview")
			.find(".compos")
			.append("<img src='img/ch_0" + (numberOfPeople + 1) + ".png' class='ch " + position + "'>");

		var characters = $("#preview").find(".ch");
		var numberOfPeople = characters.length;

		for(k = 0; k < (numberOfPeople + 1); k++)
		{
			$(characters[k]).css("left", (separation * k) + translateX[numberOfPeople]);
		}
	}
};

$("button.add").on("click", function()
{
	var gender = $(this).parent().parent().attr("class").split(" ")[1];
	var age = $(this).parent().parent().attr("class").split(" ")[2];
	checkSize(gender, age);
});

$("#choose").find(".btn").on("click", function()
{
	$(this).parent().removeClass("active");
	$("#preview").addClass("active");
});


$("button.back").on("click", function()
{
	var gender = $(this).attr("class").split(" ")[0];

	$(this).parent().parent().removeClass("active");
	$("#choose").addClass("active");
});


$("#choose").find(".characters button").on("click", function()
{
	var gender = $(this).attr("class").split(" ")[0];

	$(this).parent().parent().removeClass("active");
	$(".edit." + gender + ".child").addClass("active");
});