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

let currentTimeEl = $("#currentDay");
let colorRows = [];
let taskObject = {};
setInterval(displayTime, 1000);

// handle displaying the time
function displayTime() {
	let currentTime = moment().format(
		"[Date:] MMM DD, YYYY [Time:] hh:mm:ss a [Time Zone:]Z"
	);
	currentTimeEl.text(currentTime);
}

function getRowColors() {
	//Set current time format: h => 1 2 ... 11 12; A => AM PM
	// let currentTime = moment().format();
	let timeFormat = moment(moment().format("hA"), "hA");
	console.log(timeFormat);

	for (i = 0; i < businessHours.length; i++) {
		if (moment(businessHours[i], "hA").isBefore(timeFormat)) {
			colorRows.push("past");
		} else if (moment(businessHours[i], "hA").isSame(timeFormat)) {
			colorRows.push("present");
		} else colorRows.push("future");
	}
	timeFormat = 0;
	console.log(timeFormat);
	return;
}

function setRowColors() {
	getRowColors();
	console.log("auto-refresh");

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
	for (i = 0; i < 9; i++) {
		if (items !== null) {
			$("textarea").eq(i).text(items[i]);
			taskObject[i] = items[i];
		}
	}
}

function initApp() {
	setRowColors();
	displayTime();

	//Define a list of data-ids
	for (i = 0; i < businessHours.length; i++) {
		$("button").eq(i).attr("data-id", [i]);
		$("textarea").eq(i).attr("data-id", [i]);
	}
	renderPerm();
}

initApp();
