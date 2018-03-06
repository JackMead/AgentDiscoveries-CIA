import chai from 'chai'
import React from 'react'
import * as utilities from "../src/components/utilities/search-utilities";

let expect = chai.expect;

describe("search utilities", () => {
    "use strict";

    it('should add timezone identifier Z to `toTime` and `fromTime` keys, and add one to the day for `toTime`', () => {
        let dateString = [2000,12,1];
        let date = new Date(dateString);
        let expectedFromTimeString = utilities.getDateString(date);
        date.setDate(date.getDate()+1);
        let expectedToTimeString = utilities.getDateString(date);
        expect(utilities.getTransformedData("toTime", dateString)).to.equal(expectedToTimeString);
        expect(utilities.getTransformedData("fromTime", dateString)).to.equal(expectedFromTimeString);
    });

    it('should not transform other keys', () => {
        expect(utilities.getTransformedData("aKey", "aValue")).to.equal("aValue");
        expect(utilities.getTransformedData("name", 4)).to.equal(4);
        expect(utilities.getTransformedData("Status", "2 10 5")).to.equal("2 10 5");
        const date = new Date(2017,2,4);
        expect(utilities.getTransformedData("a time", date)).to.equal(date);
    });
});