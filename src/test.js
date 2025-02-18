import {Time} from "./Time";

import TimeCalcuator from "./TimeCalculator";

const assert = require('assert')
it('should parse the time correctly from string', () => {
    let t = Time.fromString("18:12")

    assert.equal(t.toString(), "18:12")
})

it('should parse the time correctly from timestamp', () => {
    assert.equal(Time.fromTotalMinutes((2 * 60) + 12).toString(), "2:12")
})

it('should compare time', () => {
    let t = new Time(12, 00)

    assert.equal(t.compare(11, 59), 1)
    assert.equal(t.compare(12, 00), 0)
    assert.equal(t.compare(12, 01), -1)
})

it('should add time', () => {
    let t = new Time(14, 20)

    let newT = t.add(2, 40)

    assert.equal(t.toString(), "14:20")
    assert.equal(newT.toString(), "17:00")
    assert.equal(newT.add(0, 59), "17:59")
})

it('should subtract time', () => {
    let t = new Time(14, 20)

    let newT = t.sub(2, 40)

    assert.equal(t.toString(), "14:20")
    assert.equal(t.sub(0, 00).toString(), "14:20")
    assert.equal(newT.toString(), "11:40")
    assert.equal(newT.sub(0, 40).toString(), "11:00")
    assert.equal(t.sub(14, 40).toString(), "-0:20")
    assert.equal(t.sub(15, 20).toString(), "-1:00")
})

it('should diff time', () => {
    let t = new Time(14, 20)

    let newT = t.diff(2, 40)

    assert.equal(t.toString(), "14:20")
    assert.equal(t.diff(0, 00).toString(), "14:20")
    assert.equal(newT.toString(), "11:40")
    assert.equal(newT.diff(0, 40).toString(), "11:00")
    assert.equal(t.diff(14, 40).toString(), "0:20")
    assert.equal(t.diff(15, 20).toString(), "1:00")
})

it('should determine the total breaks spent', () => {
    let t = new TimeCalcuator()
    assert.equal(t.breaks(["6:00", "6:35", "7:00", "8:14", "10:20", "10:30"]).toString(), "2:31")
    assert.equal(t.breaks(["6:00"]).toString(), "0:00")
    assert.equal(t.breaks([]).toString(), "0:00")
})

it('should determint the total breaks spent on unsorted hours', () => {
    let t = new TimeCalcuator()
    assert.equal(t.breaks(["6:00", "6:35", "7:00", "8:14", "10:00"]).toString(), "2:11")
    assert.equal(t.breaks(["6:35", "10:00", "8:14", "7:00", "6:00"]).toString(), "2:11") 
})

it('should determine no breaks', () => {
    let t = new TimeCalcuator()
    assert.equal(t.breaks(["6:00"]).toString(), "0:00")
})

it('should determine the total time spent', () => {
    let t = new TimeCalcuator()
    let time = new Time();
    assert.equal(t.timeSpent(["6:00", "6:35", "7:00", "8:14", "10:00"]).toString(), time.add(1, 49).sub(10, 00).toString())
    assert.equal(t.timeSpent(["6:00", "6:35", "7:00", "8:14", "10:20", "10:30"]).toString(), "1:59")
    assert.equal(t.timeSpent([]).toString(), "0:00")
    assert.equal(t.timeSpent(["8:00"]).toString(), (new Time()).sub(8, 00).toString())
})

it('should determine the time to go regarding the break time', () => {
    let t = new TimeCalcuator(new Time(0, 30), new Time(8, 12))
    let time = new Time()
    
    assert.equal(t.timeToGo(["6:00", "6:35", "7:00", "8:14", "10:20", "10:30"]).toString(), "6:13")
    assert.equal(t.timeToGo([]).toString(), "8:42")
    assert.equal(t.timeToGo([time.toString()]).toString(), "8:42")
    assert.equal(t.timeToGo(["6:00", "14:42"]).toString(), "0:00")
    assert.equal(t.timeToGo(["6:00", "15:00"]).toString(), "-0:18")
})

it('should determine the go time regarding the break time', () => {
    let t = new TimeCalcuator(new Time(0, 30), new Time(8, 12))
    let time = new Time()

    assert.equal(t.goTime(["6:00", "6:35", "7:00", "8:14", "10:20", "10:30"]).toString(), time.add(6, 13).toString())
    assert.equal(t.goTime([]).toString(), time.add(8,42).toString())
    assert.equal(t.goTime([time.toString()]).toString(), time.add(8,42).toString())
    assert.equal(t.goTime([time.sub(10, 12), time]).toString(), time.toString())
    assert.equal(t.goTime([time.sub(8, 41), time]).toString(), time.add(0, 1).toString())
})