/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/IntervalTimer.js":
/*!******************************!*\
  !*** ./src/IntervalTimer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IntervalTimer =
/*#__PURE__*/
function () {
  function IntervalTimer(callback, interval) {
    _classCallCheck(this, IntervalTimer);

    this.callback = callback;
    this.interval = interval;
    this.state = 0;
    this.resume();
  }

  _createClass(IntervalTimer, [{
    key: "pause",
    value: function pause() {
      if (this.state != 1) return;
      window.clearInterval(this.timerId);
      this.state = 0;
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.state != 0) return;
      this.state = 1;
      this.timerId = window.setInterval(this.callback, this.interval);
    }
  }]);

  return IntervalTimer;
}();

module.exports = IntervalTimer;

/***/ }),

/***/ "./src/Time.js":
/*!*********************!*\
  !*** ./src/Time.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Time =
/*#__PURE__*/
function () {
  function Time() {
    var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var isNegative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Time);

    this.isNegative = isNegative;

    if (hours != null && minutes != null) {
      this.hours = parseInt(hours);
      this.minutes = parseInt(minutes);
    } else {
      var date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
    }
  }

  _createClass(Time, [{
    key: "getTotalMinutes",
    value: function getTotalMinutes() {
      var totalMinutes = this.hours * 60 + this.minutes;

      if (this.isNegative) {
        return totalMinutes * -1;
      }

      return totalMinutes;
    }
  }, {
    key: "diff",
    value: function diff() {
      var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var minutes = arguments.length > 1 ? arguments[1] : undefined;
      var time = this.normalizeArguments(hours, minutes);
      return Time.fromTotalMinutes(Math.abs(time.getTotalMinutes() - this.getTotalMinutes()));
    }
  }, {
    key: "add",
    value: function add() {
      var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var time = this.normalizeArguments(hours, minutes);
      return Time.fromTotalMinutes(time.getTotalMinutes() + this.getTotalMinutes());
    }
  }, {
    key: "sub",
    value: function sub(hours, minutes) {
      var time = this.normalizeArguments(hours, minutes);
      time.isNegative = !time.isNegative;
      return this.add(time);
    }
  }, {
    key: "compare",
    value: function compare(hours, minutes) {
      var time = this.normalizeArguments(hours, minutes);

      if (time.isNegative != this.isNegative) {
        if (time.isNegative) {
          return 1;
        } else {
          return -1;
        }
      }

      if (this.hours > time.hours) {
        return 1;
      }

      if (this.hours == time.hours && this.minutes > time.minutes) {
        return 1;
      }

      if (this.hours == time.hours && this.minutes == time.minutes) {
        return 0;
      }

      return -1;
    }
  }, {
    key: "normalizeArguments",
    value: function normalizeArguments() {
      var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var time;

      if (hours == null && minutes == null) {
        time = new Time();
      } else if (hours instanceof Time) {
        time = hours;
      } else if (minutes == null) {
        time = Time.fromTotalMinutes(hours);
      } else {
        time = new Time(hours, minutes);
      }

      return time;
    }
  }, {
    key: "toString",
    value: function toString() {
      return (this.isNegative ? "-" : "") + this.hours + ":" + ("" + this.minutes).padStart(2, 0);
    }
  }], [{
    key: "fromString",
    value: function fromString(time) {
      if (!time) {
        return new Time(0, 0);
      }

      if (time instanceof Time) {
        return time;
      }

      var hours = time.trim().split(":")[0];
      var minutes = time.trim().split(":")[1];
      var isNegative = hours[0] == '-';
      return new Time(isNegative ? hours.subStr(1) : hours, minutes, isNegative);
    }
  }, {
    key: "fromTotalMinutes",
    value: function fromTotalMinutes(totalMinutes) {
      var isNegative = parseInt(totalMinutes) < 0;
      totalMinutes = Math.abs(totalMinutes);
      return new Time(Math.floor(totalMinutes / 60), totalMinutes % 60, isNegative);
    }
  }]);

  return Time;
}();

module.exports = Time;

/***/ }),

/***/ "./src/TimeCalculator.js":
/*!*******************************!*\
  !*** ./src/TimeCalculator.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Time = __webpack_require__(/*! ./Time */ "./src/Time.js");

var TimeCalculator =
/*#__PURE__*/
function () {
  function TimeCalculator(minimumBreak, minimumWorkday) {
    _classCallCheck(this, TimeCalculator);

    this.minimumBreak = Time.fromString(minimumBreak);
    this.minimumWorkday = Time.fromString(minimumWorkday);
  }

  _createClass(TimeCalculator, [{
    key: "breaks",
    value: function breaks(checkpoints) {
      var isSorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      checkpoints = isSorted ? checkpoints : this.sort(checkpoints);

      if (checkpoints.length < 2) {
        return new Time(0, 0);
      }

      var breakTime = new Time(0, 0);
      var lastCheckoutTime = null;

      for (var i = 1; i < checkpoints.length; i++) {
        if (i % 2 == 1) {
          lastCheckoutTime = Time.fromString(checkpoints[i]);
        } else {
          breakTime = breakTime.add(lastCheckoutTime.diff(Time.fromString(checkpoints[i])));
        }
      }

      return breakTime;
    }
  }, {
    key: "timeSpent",
    value: function timeSpent(checkpoints) {
      var isSorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      checkpoints = isSorted ? checkpoints : this.sort(checkpoints);

      if (checkpoints.length === 0) {
        return new Time(0, 0);
      }

      if (checkpoints.length % 2 == 1) {
        return Time.fromString(checkpoints[0]).diff(new Time()).diff(this.breaks(checkpoints, true));
      }

      return Time.fromString(checkpoints[0]).diff(Time.fromString(checkpoints[checkpoints.length - 1])).diff(this.breaks(checkpoints, true));
    }
  }, {
    key: "timeToGo",
    value: function timeToGo(checkpoints) {
      var isSorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      checkpoints = isSorted ? checkpoints : this.sort(checkpoints);
      var breakTime = this.breaks(checkpoints, true);
      var timeToGo = this.timeSpent(checkpoints, true);

      if (this.minimumBreak.compare(breakTime) == 1) {
        return this.minimumWorkday.add(this.minimumBreak.diff(breakTime)).sub(timeToGo);
      }

      return this.minimumWorkday.sub(timeToGo);
    }
  }, {
    key: "goTime",
    value: function goTime(checkpoints) {
      var isSorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      checkpoints = isSorted ? checkpoints : this.sort(checkpoints);

      if (this.timeToGo(checkpoints, true).isNegative) {
        return new Time();
      }

      return new Time().add(this.timeToGo(checkpoints, true));
    }
  }, {
    key: "sort",
    value: function sort(checkpoints) {
      var newCheckpoints = _toConsumableArray(checkpoints);

      var length = newCheckpoints.length;
      var i, j, stop;

      for (i = 0; i < length; i++) {
        for (j = 0, stop = length - i; j < stop; j++) {
          if (newCheckpoints[j + 1] && newCheckpoints[j] && Time.fromString(newCheckpoints[j]).compare(Time.fromString(newCheckpoints[j + 1])) === 1) {
            this.swap(newCheckpoints, j, j + 1);
          }
        }
      }

      return newCheckpoints;
    }
  }, {
    key: "swap",
    value: function swap(list, firstIndex, secondIndex) {
      var temp = list[firstIndex];
      list[firstIndex] = list[secondIndex];
      list[secondIndex] = temp;
    }
  }]);

  return TimeCalculator;
}();

module.exports = TimeCalculator;

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Time = __webpack_require__(/*! ./Time */ "./src/Time.js");

var TimeCalculator = __webpack_require__(/*! ./TimeCalculator */ "./src/TimeCalculator.js");

var IntervalTimer = __webpack_require__(/*! ./IntervalTimer */ "./src/IntervalTimer.js");

var MINIMUM_BREAKTIME = "0:30";
var WORKDAY = "8:12";
var timerInterval;

function displayTime(time, description) {
  return "<span style=\"flex: 1; text-align: right; padding: 0 2px; font-size: 30px;\">" + time.toString() + "</span><span class='time-description'>" + description + "</span>";
}

function readTimes() {
  var timeElements = document.querySelectorAll(".today.stempel-day .time");

  if (!timeElements.length) {
    return false;
  }

  var times = [];

  for (var i = 0; i < timeElements.length; i++) {
    if (timeElements[i].textContent != '00:00') {
      times.push(timeElements[i].textContent);
    }
  }

  var calculator = new TimeCalculator(MINIMUM_BREAKTIME, WORKDAY);
  return [{
    text: localStorage.getItem("text-0") || "Time spent",
    value: calculator.timeSpent(times)
  }, {
    text: localStorage.getItem("text-1") || "Time to go",
    value: calculator.timeToGo(times)
  }, {
    text: localStorage.getItem("text-2") || "Go Time",
    value: calculator.goTime(times)
  }];
}

function display(times) {
  var wrapper = document.querySelector(".timing");

  if (!wrapper) {
    var row = document.createElement("DIV");
    row.classList = "row";
    wrapper = document.createElement("DIV");
    wrapper.style = "margin: 0 -15px 15px; background: #f4f4f4; padding: 1rem 0;";
    wrapper.classList = "timing";
    var title = document.createElement("P");
    title.classList = "text-uppercase";
    title.style = "text-align: center; font-weight: bolder;";
    title.appendChild(document.createTextNode("Time stats"));
    wrapper.appendChild(title);

    wrapper.ondblclick = function (e) {
      var descElements = document.querySelectorAll(".time-description");
      descElements.forEach(function (el) {
        return el.contentEditable = true;
      });
      timerInterval.pause();
      var body = document.querySelector("body");
      body.classList.add("is-paused");
      window.addEventListener('keypress', function (ev) {
        var key = ev.which || ev.keyCode;

        if (key == 13) {
          body.classList.remove("is-paused");
          ev.preventDefault();

          for (var i = 0; i < descElements.length; i++) {
            localStorage.setItem("text-" + i, descElements[i].innerHTML);
            descElements[i].contentEditable = false;
          }

          timerInterval.resume();
        }
      });
    };

    var element;

    for (var i = 0; i < times.length; i++) {
      element = document.createElement("P");
      element.style = "display:flex; align-items: baseline;";
      element.classList = "time-" + i;
      wrapper.appendChild(element);
    }

    var description = document.createElement("DIV");
    description.style = "margin-top: .5rem; text-align: center; font-style: italic;";
    description.appendChild(document.createTextNode("Double click to edit the texts, enter to save"));
    wrapper.appendChild(description);
    row.appendChild(wrapper);
    document.querySelector(".stempel-data").parentElement.insertBefore(wrapper, document.querySelector(".stempel-data"));
  }

  var isOvertime = false;

  for (var _i = 0; _i < times.length; _i++) {
    if (times[_i].value.isNegative) {
      isOvertime = true;
    }

    document.querySelector(".time-" + _i).innerHTML = displayTime(times[_i].value, times[_i].text);
  }

  if (isOvertime) {
    document.querySelector('.timing').classList = "timing pulse";
  }
}

var displayTimespent = function displayTimespent() {
  var times = readTimes();

  if (!times) {
    return false;
  }

  display(times);
};

window.onload = function () {
  timerInterval = new IntervalTimer(displayTimespent, 1000);
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = "\n    .is-paused .timing {\n        border: 2px dashed orange; \n    }\n    .is-paused .time-description {\n        background: white;\n    }\n    .time-description {\n        flex: 1;\n        text-align: left;\n        padding: 0 2px;\n    }\n    @-webkit-keyframes pulse {\n        from {\n            -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n        }\n        \n        50% {\n            -webkit-transform: scale3d(1.05, 1.05, 1.05);\n            transform: scale3d(1.05, 1.05, 1.05);\n        }\n        \n        to {\n            -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n        }\n    }\n    \n    @keyframes pulse {\n        from {\n            -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n        }\n        \n        50% {\n            -webkit-transform: scale3d(1.05, 1.05, 1.05);\n            transform: scale3d(1.05, 1.05, 1.05);\n        }\n        \n        to {\n            -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n        }\n    }\n    \n    .pulse {\n    -webkit-animation-name: pulse;\n    animation-name: pulse;\n    animation-iteration-count: infinite;\n    -webkit-animation-duration: 3s;\n    animation-duration: 3s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    border: 3px solid #84b2a6;\n\n    }";
  document.head.append(style);
};

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\wehn2\Downloads\chrome-ext\src\main.js */"./src/main.js");


/***/ })

/******/ });