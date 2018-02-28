import chai from 'chai'
import React from 'react'
import * as utilities from "../src/components/user/user-utilities";
let expect = chai.expect;

describe("login utilities", ()=>{
    "use strict";

    it('should set tokens on logging in', ()=>{
        const token = "a Token";
        const userId= "2";
        utilities.logIn(token, userId);
        expect(window.localStorage.getItem("Token")).to.equal(token);
        expect(window.localStorage.getItem("UserId")).to.equal(userId);
    });

    it('should recognise when user logs in', ()=>{
        utilities.logOut();
        expect(utilities.isLoggedIn()).to.equal(false);
        utilities.logIn("aToken", "2");
        expect(utilities.isLoggedIn()).to.equal(true);
    });

    it('should clear tokens on logging out', ()=>{
       window.localStorage.setItem("Token", "token");
        utilities.logOut();
        expect(window.localStorage.getItem("Token")).to.be.undefined;
    });

    it('should recognise when user logs out', ()=>{
        utilities.logIn("aToken", "2");
        utilities.logOut();
        expect(utilities.isLoggedIn()).to.be.false;
    });
});