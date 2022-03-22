//Define global variables here

const businessHours = [
	"9AM",
	"10AM",
	"11AM",
	"12PM",
	"1PM",
	"2PM",
	"3PM",
	"4PM",
	"5PM",
];

let colorRows = [];
let taskObject = {};

function getRowColors() {
	//Set current time format: h => 1 2 ... 11 12; A => AM PM
	let currentTime = moment();
	let timeFormat = moment(currentTime.format("hA"), "hA");

	for (i = 0; i < businessHours.length; i++) {
		if (moment(businessHours[i], "hA").isBefore(timeFormat)) {
			colorRows.push("past");
		} else if (moment(businessHours[i], "hA").isSame(timeFormat)) {
			colorRows.push("present");
		} else colorRows.push("future");
	}
	return;
}

function setRowColors() {
	getRowColors();

	let rowSelector = $(".row");
	$(rowSelector).each(function (index) {
		$(this).addClass(colorRows[index]);
	});
	saveTemp();
}

function saveTemp() {
	$("button").click((event) => {
		selector =
			event.target.parentElement.parentElement.children[1].firstElementChild;
		selectorId = selector.getAttribute("data-id");
		selectorText = selector.value;

		taskObject[selectorId] = selectorText;
		savePerm();
	});
}

function savePerm() {
	localStorage.setItem("taskObject", JSON.stringify(taskObject));
}

function renderPerm() {
	let items = JSON.parse(localStorage.getItem("taskObject"));
	if (items !== null) {
		console.log(items, items.length);
		for (i = 0; i < 8; i++) {
			console.log(items[i]);
			$("textarea").eq(i).text(items[i]);
			taskObject[i] = items[i];
		}
	}
	// console.log(items, items.length)
}

// event.preventDefault();
// textEl = $("textarea").select((event) => {
//   selection = event.target.val();
//   console.log(selection);
// });
// $("button").click(function () {
//   itemList.push($(textEl.text()));
//   // console.log(itemList);
// });

// $("button").on("click", (event) => {console.log(event.target.parentElement)});
// $("button").click(function () {
//   alert($("textarea:selected").val());
// });

function initApp() {
	setRowColors();

	//Define a list of data-ids
	let buttonEl = $("button");
	let textEl = $("textarea");
	for (i = 0; i < businessHours.length; i++) {
		buttonEl.eq(i).attr("data-id", [i]);
		textEl.eq(i).attr("data-id", [i]);
	}
	renderPerm();
}

initApp();

// $("button").on("click", (event) => {console.log(event.target.parentElement)})
//$("button").click((event) => {console.log(event.target.parentElement.parentElement.children[1].firstElementChild)})
