import TimeCalculator from "./TimeCalculator";
import IntervalTimer from "./IntervalTimer";

const MINIMUM_BREAKTIME = "0:30"
const WORKDAY = "8:12"
let timerInterval;


function displayTime(time, description) {
    return `<span style="flex: 1; text-align: right; padding: 0 2px; font-size: 30px;">`
        + time.toString()
        + "</span><span class='time-description'>"
        + description + "</span>";
}


function readTimes() {
    let timeElements = document.querySelectorAll(".today.stempel-day .time")


    if (!timeElements.length) {
        return false;
    }

    let times = [];

    for (let i = 0; i < timeElements.length; i++) {
        if (timeElements[i].textContent != '00:00') {
            times.push(timeElements[i].textContent);
        }
    }


    let calculator = new TimeCalculator(MINIMUM_BREAKTIME, WORKDAY);
    return [
        {
            text: localStorage.getItem("text-0") || "Time spent",
            default: "Time spent",
            value: calculator.timeSpent(times)
        },
        {
            text: localStorage.getItem("text-1") || "Time to go",
            default: "Time to go",
            value: calculator.timeToGo(times)
        },
        {
            text: localStorage.getItem("text-2") || "Go Time",
            default: "Go Time",
            value: calculator.goTime(times)
        }
    ]
}

function display(times) {
    var wrapper = document.querySelector(".timing");
    if (!wrapper) {
        let row = document.createElement("DIV");
        row.classList = "row";
        wrapper = document.createElement("DIV");
        wrapper.style = "margin: 0 -15px 15px; background: #f4f4f4; padding: 1rem 0;";
        wrapper.classList = "timing"

        let title = document.createElement("P");
        title.classList = "text-uppercase";
        title.style = "text-align: center; font-weight: bolder;";
        title.appendChild(document.createTextNode("Time stats"))

        wrapper.appendChild(title);

        wrapper.ondblclick = (e) => {
            let descElements = document.querySelectorAll(".time-description");
            descElements.forEach(el => el.contentEditable = true);
            timerInterval.pause()
            let body = document.querySelector("body")
            body.classList.add("is-paused")

            window.addEventListener('keypress', (ev) => {
                let key = ev.which || ev.keyCode;
                if (key == 13) {
                    body.classList.add("custom-text")
                    body.classList.remove("is-paused")
                    ev.preventDefault()

                    for (let i = 0; i < descElements.length; i++) {
                        localStorage.setItem("text-" + i, descElements[i].innerHTML);
                        descElements[i].contentEditable = false;
                    }

                    timerInterval.resume()
                }
            })
        };

        let element;
        for (let i = 0; i < times.length; i++) {
            element = document.createElement("P");
            element.style = "display:flex; align-items: baseline;";
            element.classList = "time-" + i;
            wrapper.appendChild(element);
        }

        let description = document.createElement("DIV");
        description.classList.add("timing-help-text")
        description.style = "margin-top: .5rem; text-align: center; font-style: italic;"
        description.appendChild(document.createTextNode("Double click to edit the texts, enter to save"))
        wrapper.appendChild(description);

        row.appendChild(wrapper);

        document
            .querySelector(".stempel-data")
            .parentElement
            .insertBefore(wrapper, document.querySelector(".stempel-data"));
    }

    let isOvertime = false;
    let hasCustomText = false;

    for (let i = 0; i < times.length; i++) {
        if (times[i].value.isNegative) {
            isOvertime = true;
        }
        if (localStorage.getItem("text-" + i) != null) {
            hasCustomText = true;
        }
        document.querySelector(".time-" + i).innerHTML = displayTime(times[i].value, times[i].text);
    }

    if (hasCustomText) {
        document.querySelector('body').classList.add("custom-text")
    }

    if (isOvertime) {
        document.querySelector('.timing').classList.add("pulse");
    }
}

let displayTimespent = function () {
    let times = readTimes();
    if (!times) {
        return false;
    }

    display(times);

}


window.onload = function () {
    timerInterval = new IntervalTimer(displayTimespent, 1000)

    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
    .is-paused .timing {
        border: 2px dashed orange; 
    }
    .is-paused .time-description {
        background: white;
    }
    .time-description {
        flex: 1;
        text-align: left;
        padding: 0 2px;
    }
    .custom-text .timing-help-text {
        display:none;
    }
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
