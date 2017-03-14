/* Get Elements */

const audio = document.querySelectorAll("audio");
const typeTitle = document.querySelector(".type");
let screenMinute = document.querySelector("#minute");
let screenSecond = document.querySelector("#seconds");
const sessionDown = document.querySelector("#session-down");
const sessionUp = document.querySelector("#session-up");
const breakDown = document.querySelector("#break-down");
const breakUp = document.querySelector("#break-up");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const numbers = document.querySelectorAll(".number");

/* Defaults */
let sessionTime = Number(numbers[0].textContent);
let breakTime = Number(numbers[1].textContent);
let pauseFlag = false;
let seconds = 0;
let minutes = 25;

//variable for the setInterval func.
let count;

/* Up and Down Buttons to adjust session & break durations */
sessionDown.addEventListener('click', () => {
	if (!pauseFlag) {
		if (sessionTime > 1) {
			sessionTime--;
			numbers[0].textContent = sessionTime;
			//reset
			typeTitle.textContent = "SESSION";
			seconds = 0;
			minutes = sessionTime;
			if (minutes < 10) {
				screenMinute.textContent = '0' + minutes;
			}
			else { screenMinute.textContent = minutes;}
			screenSecond.textContent = '0' + seconds;
		}
	}
});
sessionUp.addEventListener('click', () => {
	if (!pauseFlag) {
			sessionTime++;
			numbers[0].textContent = sessionTime;
			//reset
			typeTitle.textContent = "SESSION";
			seconds = 0;
			minutes = sessionTime;
			if (minutes < 10) {
				screenMinute.textContent = '0' + minutes;
			}
			else { screenMinute.textContent = minutes;}
			screenSecond.textContent = '0' + seconds;
	}	
});
breakDown.addEventListener('click', () => {
	if (!pauseFlag) {
		if (breakTime > 1) {
			breakTime--;
			numbers[1].textContent = breakTime;
			//reset
			typeTitle.textContent = "SESSION";
			seconds = 0;
			minutes = sessionTime;
			if (minutes < 10) {
				screenMinute.textContent = '0' + minutes;
			}
			else { screenMinute.textContent = minutes;}
			screenSecond.textContent = '0' + seconds;
		}
	}
});
breakUp.addEventListener('click', () => {
	if (!pauseFlag) {
			breakTime++;
			numbers[1].textContent = breakTime;
			//reset
			typeTitle.textContent = "SESSION";
			seconds = 0;
			minutes = sessionTime;
			if (minutes < 10) {
				screenMinute.textContent = '0' + minutes;
			}
			else { screenMinute.textContent = minutes;}
			screenSecond.textContent = '0' + seconds;
	}	
});

/* Start Btn */
startBtn.addEventListener('click', function(){
	if (!pauseFlag) {
		startBtn.textContent = "PAUSE";
		count = setInterval(countdown, 1000);
		pauseFlag = !pauseFlag;
	}
	else {
		startBtn.textContent = "START";
		clearInterval(count);
		pauseFlag = !pauseFlag;
	}
});

/* Reset Btn */
resetBtn.addEventListener('click', function(){
	pauseFlag = false;
	startBtn.textContent = "START";
	clearInterval(count);
	minutes = 25;
	seconds = 0;
	screenMinute.textContent = minutes;
	screenSecond.textContent = '0' + seconds;
	numbers[0].textContent = minutes;
	numbers[1].textContent = 5;
});

/* Countdown from the set sessionTime and loop through sessions and breaks */
function countdown() {
	if (minutes === 0 && seconds === 0) {
		if (typeTitle.textContent.trim(" ") === "SESSION") {
			audio[0].play(); //victory
			typeTitle.textContent = "BREAK";
			minutes = breakTime;
			screenMinute.textContent = '0' + minutes;
			screenSecond.textContent = '0' + seconds;
		}
		else if (typeTitle.textContent === "BREAK") {
			audio[1].play(); //airhorn
			typeTitle.textContent = "SESSION";
			minutes = sessionTime;
			screenMinute.textContent = minutes;
			screenSecond.textContent = '0' + seconds;
		}
	}
	else {
		if (seconds === 0) {
			seconds = 60;
			minutes--;
		}

		seconds--;
		if (seconds < 10) {
			screenSecond.textContent = '0' + seconds;
		} else {
			screenSecond.textContent = seconds;
		}
		if (minutes < 10) {
			screenMinute.textContent = '0' + minutes;
		} else {
			screenMinute.textContent = minutes;
		}
	}
}