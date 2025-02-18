export class IntervalTimer {

	private state: number = 0;
	private timerId: number;

	constructor(private callback: () => void, private interval: number) {
		this.resume();
	}

	pause() {
		if (this.state != 1) {
			return;
		}

		window.clearInterval(this.timerId);
		this.state = 0;
	};

	resume() {
		if (this.state != 0) {
			return;
		}

		this.state = 1;
		this.timerId = window.setInterval(this.callback, this.interval);
	};
}