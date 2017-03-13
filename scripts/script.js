
const startBtn = document.querySelector("#startBtn");
const audio = document.querySelector("audio");
const title = document.querySelector(".type");

const app = angular.module('pomodoro', [])
	.controller('clock', ['$scope', function($scope){

			/* defautls */
			let minute = 25;
			let	breakTime = 5;
			let second = 0;
			$scope.second = '0' + second;
			$scope.minute = minute;
			$scope.sessionTime = minute;
			$scope.breakTime = breakTime;
			let flag = true;

			//when start btn is clicked update
			$scope.start = function() {
				minute = $scope.sessionTime;
				breakTime = $scope.breakTime;

				//Change the text on the btn
				if (flag) {
					startBtn.textContent = 'PAUSE';
					flag = !flag;
				} else {
					startBtn.textContent = 'START';
					flag = !flag;
				}

				//If it is clicked when it is 'PAUSE', start the timer
				if (startBtn.textContent == 'PAUSE') {
					if (minute === 0 && second === 0) {
						audio.play();
						if (title.textContent.trim(" ") == "SESSION") {
							minute = $scope.breakTime;
							title.textContent = "BREAK";
						} else {
							minute = $scope.sessionTime;
							title.textContent = "SESSION";
						}
					}
					else {
						if (second < 10) {
							$scope.second = '0' + second;
						} else {
							$scope.second = second;
						}
						if (minute < 10) {
							$scope.minute = '0' + minute;
						} else {
							$scope.minute = minute;
						}	
					}
				}

			};

			//reset btn
			$scope.reset = function() {
				$scope.second = '0' + 0;
				$scope.minute = 25;
				$scope.sessionTime = 25;
				$scope.breakTime = 5;
			};


}]);