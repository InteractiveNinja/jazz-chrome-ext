const Time = require('./Time')
const TimeCalculator = require('./TimeCalculator')
const MINIMUM_BREAKTIME = "0:30"
const WORKDAY = "8:12"


function displayTime(time, description) {
    return `<span style="flex: 1; text-align: right; padding: 0 2px; font-size: 30px;">`
    + time.toString()
	+ "</span><span style='flex: 1; text-align: left; padding: 0 2px;'>"
	+ description + "</span>";
}


function readTimes() {
    let timeElements = document.querySelectorAll(".today.stempel-day .time")


	if(!timeElements.length) {
		return false;
    }

    let times = [];

    for(let i = 0; i < timeElements.length; i++) {
        if(timeElements[i].textContent != '00:00') {
            times.push(timeElements[i].textContent);
        }
    }

   
    let calculator = new TimeCalculator(MINIMUM_BREAKTIME, WORKDAY);
    return [
        {
            text: "Time spent",
            value: calculator.timeSpent(times)
        },
        {
            text: "Time to go", 
            value: calculator.timeToGo(times)
        },
        {
            text: "Estimated go time", 
            value: calculator.goTime(times)
        }
    ]
}

function display(times) {
	var wrapper = document.querySelector(".timing");
	if(!wrapper) {
		let row = document.createElement("DIV");
		row.classList = "row";
		wrapper = document.createElement("DIV");
		wrapper.style ="margin: 0 -15px 15px; background: #f4f4f4; padding: 1rem 0;";
        wrapper.classList = "timing"

        let title = document.createElement("P");
		title.classList = "text-uppercase";
		title.style = "text-align: center; font-weight: bolder;";
		title.appendChild(document.createTextNode("Time stats"))

        wrapper.appendChild(title);
        
        let element;
        for(let i = 0; i < times.length; i++) {
            element = document.createElement("P");
            element.style = "display:flex; align-items: baseline;";
            element.classList = "time-" + i;
            wrapper.appendChild(element);
        }

		row.appendChild(wrapper);

		document
			.querySelector(".stempel-data")
			.parentElement
			.insertBefore(wrapper, document.querySelector(".stempel-data"));
    }

    let isOvertime = false;
    
    for(let i = 0; i < times.length; i++) {
        if(times[i].value.isNegative) {
            isOvertime = true;
        }
        document.querySelector(".time-" + i).innerHTML = displayTime(times[i].value, times[i].text);
    }
    
    if(isOvertime) {
        document.querySelector('.timing').classList = "timing pulse";
    }
}

let displayTimespent = function() {

	let times = readTimes();
	if(!times) {
		return false;
	}
	
    display(times);

}



window.onload = function() {
	let intervalTimer = window.setInterval(displayTimespent, 1000)
    setTimeout(displayTimespent, 1000)
    
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
    @-webkit-keyframes pulse {
        from {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        
        50% {
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
        }
        
        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    @keyframes pulse {
        from {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        
        50% {
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
        }
        
        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    .pulse {
    -webkit-animation-name: pulse;
    animation-name: pulse;
    animation-iteration-count: infinite;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border: 3px solid #84b2a6;

    }`;
    document.head.append(style)
}
