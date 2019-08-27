
class Time
{
	constructor(hours = null, minutes = null, isNegative = false) {
        this.isNegative = isNegative;

		if(hours != null && minutes != null) {
            this.hours = parseInt(hours);   
            this.minutes = parseInt(minutes);
        } 
        else {
            let date = new Date()
            this.hours = date.getHours()
            this.minutes = date.getMinutes()
        }
	}

	static fromString(time) {
        if(!time) {
            return new Time(0, 0)
        }
        if(time instanceof Time) {
            return time;
        }

        let hours = time.trim().split(":")[0];
        let minutes = time.trim().split(":")[1];
        let isNegative = hours[0] == '-';

		return new Time(isNegative ? hours.subStr(1) : hours, minutes, isNegative);
	}

	static fromTotalMinutes(totalMinutes) {
        let isNegative = parseInt(totalMinutes) < 0;
        totalMinutes = Math.abs(totalMinutes);
		return new Time(Math.floor(totalMinutes / 60), totalMinutes % 60, isNegative)
    }
    
    getTotalMinutes()
    {
        let totalMinutes = this.hours * 60 + this.minutes
        
        if(this.isNegative) {
            return totalMinutes * -1;
        }
        
        return totalMinutes;
    }

    diff(hours = null, minutes) {
        let time = this.normalizeArguments(hours, minutes);

        return Time.fromTotalMinutes(Math.abs(time.getTotalMinutes() - this.getTotalMinutes()))
    }

	add(hours = null, minutes = null) {
        let time = this.normalizeArguments(hours, minutes);

        return Time.fromTotalMinutes(time.getTotalMinutes() + this.getTotalMinutes())
	}

	sub(hours, minutes) {
        let time = this.normalizeArguments(hours, minutes);

        time.isNegative = !time.isNegative;

        return this.add(time);
    }

    compare(hours, minutes) {
        let time = this.normalizeArguments(hours, minutes);

        if(time.isNegative != this.isNegative) {
            if(time.isNegative) {
                return 1;
            } else {
                return -1;
            }
        }

        if(this.hours > time.hours) {
            return 1;
        }

        if(this.hours == time.hours && this.minutes > time.minutes) {
            return 1;
        }

        if(this.hours == time.hours && this.minutes == time.minutes) {
            return 0;
        }

        return -1;
    }
    
    normalizeArguments(hours = null, minutes = null) {
        let time;

        if(hours == null && minutes == null) {
            time = new Time();
        }
        else if(hours instanceof Time) {
            time = hours;
        }
        else if(minutes == null) {
            time = Time.fromTotalMinutes(hours);
        } 
        else {
            time = new Time(hours, minutes);
        }

        return time;
    }

	toString() {
		return (this.isNegative ? "-" : "") + this.hours + ":" + ("" + this.minutes).padStart(2, 0);
	}

}
module.exports = Time;