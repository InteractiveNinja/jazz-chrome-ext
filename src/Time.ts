import _ from 'lodash';

export class Time {
	private readonly hours: number;
	private readonly minutes: number;

	constructor(readonly _hours?: string | number, readonly _minutes?: string | number, private isNegative = false) {
		if (_.isNumber(_hours) && _.isNumber(_minutes)) {
			this.hours = _hours;
			this.minutes = _minutes;
		}
		if (_.isString(_hours) && _.isString(_minutes)) {
			this.hours = parseInt(_hours);
			this.minutes = parseInt(_minutes);
		} else {
			let date = new Date();
			this.hours = date.getHours();
			this.minutes = date.getMinutes();
		}
	}

	static fromString(time: string) {
		if (!time) {
			return new Time("0", "0");
		}

		let hours = time.trim().split(":")[0];
		let minutes = time.trim().split(":")[1];
		let isNegative = hours[0] == '-';

		return new Time(isNegative ? hours.substring(1) : hours, minutes, isNegative);
	}

	static fromTotalMinutes(totalMinutes: number) {
		let isNegative = totalMinutes < 0;
		let totalMinutesAbs = Math.abs(totalMinutes);
		return new Time(Math.floor(totalMinutesAbs / 60), totalMinutesAbs % 60, isNegative);
	}

	getTotalMinutes() {
		let totalMinutes = this.hours * 60 + this.minutes;

		if (this.isNegative) {
			return totalMinutes * -1;
		}

		return totalMinutes;
	}

	diff(hours: number, minutes: number) {
		let time = new Time(hours, minutes);

		return Time.fromTotalMinutes(Math.abs(time.getTotalMinutes() - this.getTotalMinutes()));
	}

	add(hours: number, minutes: number) {
		let time = new Time(hours, minutes);

		return Time.fromTotalMinutes(time.getTotalMinutes() + this.getTotalMinutes());
	}

	sub(hours: number, minutes: number) {
		let time = new Time(hours, minutes);

		time.isNegative = !time.isNegative;

		return this.add(time.hours, time.minutes);
	}

	compare(hours: number, minutes: number) {
		let time = new Time(hours, minutes);

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

	toString() {
		return (this.isNegative ? "-" : "") + this.hours + ":" + ("" + this.minutes).padStart(2, "0");
	}

}