class IntervalTimer {

    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.state = 0;
        this.resume();
    }
    

    pause() {
        if (this.state != 1) return;

        window.clearInterval(this.timerId);
        this.state = 0;
    };

    resume() {
        if (this.state != 0) return;

        this.state = 1;
        this.timerId = window.setInterval(this.callback, this.interval);
    };
}

module.exports = IntervalTimer;