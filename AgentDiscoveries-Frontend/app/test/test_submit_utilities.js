import chai from 'chai'
import React from 'react'
import * as utilities from "../src/components/utilities/submit-utilities";
let expect = chai.expect;

describe("submit utilities", ()=>{
    "use strict";

    it('should reduce non-location data to Json form', ()=>{
        const aValue = "some value";
        const submitForm={"notLocation":{value: aValue}};
        expect(utilities.getBodyJSON(submitForm)).to.deep.equal({"notLocation": aValue});
    });

    it('should separate locations into series of integers', ()=>{
        const aValue = "10 2 14";
        const submitForm={"locations":{value: aValue}};
        expect(utilities.getBodyJSON(submitForm)).to.deep.equal({"locations": [10, 2, 14]});
    });

    it('should be able to combine locations with non-locations', ()=>{
        const submitForm={
            "notLocation": {value: "someValue"},
            "name": {value: "myName"},
            "locations": {value: "17 12 41 1"},
            "status": {value: ""}
        };
        const expectedResponse={
            "notLocation": "someValue",
            "name": "myName",
            "locations": [17,12,41,1],
            "status": ""
        };
        expect(utilities.getBodyJSON(submitForm)).to.deep.equal(expectedResponse);

    })
});