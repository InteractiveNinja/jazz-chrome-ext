import Time from "./Time";

class TimeCalculator {
    constructor(minimumBreak, minimumWorkday) {
        this.minimumBreak = Time.fromString(minimumBreak);
        this.minimumWorkday = Time.fromString(minimumWorkday);
    }

    breaks(checkpoints, isSorted = false) {
        checkpoints = isSorted ? checkpoints : this.sort(checkpoints)

        if (checkpoints.length < 2) {
            return new Time(0, 0)
        }

        let breakTime = new Time(0, 0)
        let lastCheckoutTime = null

        for (let i = 1; i < checkpoints.length; i++) {
            if (i % 2 == 1) {
                lastCheckoutTime = Time.fromString(checkpoints[i])
            } else {
                breakTime = breakTime.add(lastCheckoutTime.diff(Time.fromString(checkpoints[i])))
            }
        }

        return breakTime
    }

    timeSpent(checkpoints, isSorted = false) {
        checkpoints = isSorted ? checkpoints : this.sort(checkpoints)

        if (checkpoints.length === 0) {
            return new Time(0, 0)
        }
        if (checkpoints.length % 2 == 1) {
            return Time.fromString(checkpoints[0]).diff(new Time()).diff(this.breaks(checkpoints, true))
        }

        return Time.fromString(checkpoints[0]).diff(Time.fromString(checkpoints[checkpoints.length - 1])).diff(this.breaks(checkpoints, true))
    }

    timeToGo(checkpoints, isSorted = false) {
        checkpoints = isSorted ? checkpoints : this.sort(checkpoints)
        let breakTime = this.breaks(checkpoints, true);

        let timeToGo = this.timeSpent(checkpoints, true);
        if (this.minimumBreak.compare(breakTime) == 1) {
            return this.minimumWorkday.add(this.minimumBreak.diff(breakTime)).sub(timeToGo)
        }

        return this.minimumWorkday.sub(timeToGo)
    }

    goTime(checkpoints, isSorted = false) {
        checkpoints = isSorted ? checkpoints : this.sort(checkpoints)
        if (this.timeToGo(checkpoints, true).isNegative) {
            return new Time();
        }

        return (new Time()).add(this.timeToGo(checkpoints, true));
    }

    sort(checkpoints) {
        let newCheckpoints = [...checkpoints]
        let length = newCheckpoints.length;
        let i, j, stop;


        for (i = 0; i < length; i++) {
            for (j = 0, stop = length - i; j < stop; j++) {
                if (newCheckpoints[j + 1] && newCheckpoints[j] && Time.fromString(newCheckpoints[j]).compare(Time.fromString(newCheckpoints[j + 1])) === 1) {
                    this.swap(newCheckpoints, j, j + 1)
                }
            }
        }

        return newCheckpoints;
    }

    swap(list, firstIndex, secondIndex) {
        let temp = list[firstIndex];
        list[firstIndex] = list[secondIndex]
        list[secondIndex] = temp;
    }
}

module.exports = TimeCalculator