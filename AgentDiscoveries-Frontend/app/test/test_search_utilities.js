import chai from 'chai'
import React from 'react'
import * as utilities from "../src/components/utilities/search-utilities";
import * as sinon from "sinon"

let expect = chai.expect;

describe("search utilities", () => {
    "use strict";

    it('should correctly identify date n days ago', () => {
        let clock = sinon.useFakeTimers(new Date(2011, 0, 5).getTime());
        expect(utilities.getDateDaysAgo(3)).to.deep.equal(new Date(2011, 0, 2));
        expect(utilities.getDateDaysAgo(6)).to.deep.equal(new Date(2010,11,30));
    });

    it('should transform toTime and fromTime keys by adding timezone identifier Z', () => {
        let formDate = utilities.getFormDate(new Date(2018, 0, 8));
        let expectedString = formDate+"Z";
        expect(utilities.getTransformedData("toTime", formDate)).to.equal(expectedString);
        expect(utilities.getTransformedData("fromTime", formDate)).to.equal(expectedString);
    });

    it('should not transform other keys', () => {
        expect(utilities.getTransformedData("aKey", "aValue")).to.equal("aValue");
        expect(utilities.getTransformedData("name", 4)).to.equal(4);
        expect(utilities.getTransformedData("Status", "2 10 5")).to.equal("2 10 5");
        const formDate = utilities.getFormDate(new Date(2017,2,4));
        expect(utilities.getTransformedData("a time", formDate)).to.equal(formDate);
    });
});