import chai from 'chai'
import React from 'react'
import * as crud from "../src/components/crud";

let expect = chai.expect;

describe("crud functions", () => {
    "use strict";

    it('should use users token as authorisation', () => {
        window.localStorage.setItem("Token","myToken");
        const expectedTokenHeader = "Bearer myToken";
        expect(crud.getTokenHeader()).to.equal(expectedTokenHeader);
    });
});