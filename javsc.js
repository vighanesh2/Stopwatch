const display = document.getElementById("display");
const splitTimesList = document.getElementById("splitTimes");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const splitBtn = document.getElementById("splitBtn");
const clearBtn = document.getElementById("clearBtn");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let splitTimes = [];

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    splitTimes = [];
    updateSplitTimesDisplay();
}

function recordSplit() {
    if (isRunning) {
        const splitTime = elapsedTime;
        splitTimes.push(splitTime);
        updateSplitTimesDisplay();
    }
}

function clearSplits() {
    splitTimes = [];
    updateSplitTimesDisplay();
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay();
}

function updateDisplay() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateSplitTimesDisplay() {
    splitTimesList.innerHTML = "";
    splitTimes.forEach((splitTime, index) => {
        const listItem = document.createElement("li");
        const splitTimeFormatted = formatElapsedTime(splitTime);
        listItem.textContent = `Split ${index + 1}: ${splitTimeFormatted}`;
        splitTimesList.appendChild(listItem);
    });
}

function formatElapsedTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = Math.floor(time % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
