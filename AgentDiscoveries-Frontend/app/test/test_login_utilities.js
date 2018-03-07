import chai from 'chai'
import React from 'react'
import * as utilities from "../src/components/user/user-utilities";

let expect = chai.expect;

describe("login utilities", () => {
  "use strict";

  it('should set tokens on logging in', () => {
    const response = {token: "a Token", userId: "2"};
    utilities.logIn(response);
    expect(window.localStorage.getItem("Token")).to.equal(response.token);
    expect(window.localStorage.getItem("UserId")).to.equal(response.userId);
  });

  it('should recognise admin status after logging in', ()=>{
    const adminResponse = {token: "aToken", userId: "2", admin:true};
    utilities.logIn(adminResponse);
    expect(utilities.isAdmin());
    const nonAdminResponse = {admin: false};
    utilities.logIn(nonAdminResponse);
    expect(!utilities.isAdmin());
  });

  it('should recognise when user logs in', () => {
    utilities.logOut();
    expect(utilities.isLoggedIn()).to.equal(false);

    const response = {token: "a Token", userId: "2"};
    utilities.logIn(response);
    expect(utilities.isLoggedIn()).to.equal(true);
  });

  it('should clear tokens on logging out', () => {
    window.localStorage.setItem("Token", "token");
    utilities.logOut();
    expect(window.localStorage.getItem("Token")).to.be.undefined;
  });

  it('should recognise when user logs out', () => {
    const response = {token: "a Token", userId: "2"};
    utilities.logIn(response);
    utilities.logOut();
    expect(utilities.isLoggedIn()).to.be.false;
  });
});