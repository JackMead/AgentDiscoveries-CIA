import chai from 'chai'
import React from 'react'
import * as webdriver from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'
//The next import is required to ensure chromedriver is on the system path
import * as chromeDriver from 'chromedriver';

let expect = chai.expect;

describe("login-page", () => {
    "use strict";
    const url = process.argv[process.argv.length - 1].valueOf();
    const loginUrl = url + "/#/login";
    let driver;

    before(function () {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('headless', 'disable-gpu');
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    });

    after(function () {
        driver.quit();
    });


    it('loads', function (done) {
        this.timeout(5000);
        driver.get(loginUrl)
            .then(() => {
                return driver.getTitle()
            })
            .then(res => {
                expect(res).to.equal("Agent Discoveries")
                done();
            })
    });

    it('has a submit button', function (done) {
        this.timeout(5000);
        driver.get(loginUrl)
            .then(() => {
                const element = driver.findElement(webdriver.By.id('login-submit'));
                driver.wait(webdriver.until.elementIsVisible(element), 5000)
            })
            .then(() => {
                return driver.findElement(webdriver.By.id('login-submit'));
            })
            .then(element => {
                return element.getTagName()
            })
            .then(tag => {
                expect(tag).to.equal('button');
                done();
            })
    });

    it('does not change page on attempt to log in without credentials', function (done) {
        this.timeout(5000);
        const element = driver.findElement(webdriver.By.id('login-submit'));
        driver.get(loginUrl)
            .then(() => {
                driver.wait(webdriver.until.elementIsVisible(element), 5000)
            })
            .then(() => {
                element.click()
            })
            .then(() => {
                return driver.getCurrentUrl()
            })
            .then(url => {
                expect(url).to.equal(loginUrl);
                done();
            })
    });

    it('changes page on logging in with credentials', function (done) {
        this.timeout(5000);
        const searchUrl = url + "/#/search/location";
        const userNameInput = driver.findElement(webdriver.By.id('user-name-input'));

        driver.get(loginUrl)
            .then(() => {
                driver.wait(webdriver.until.elementIsVisible(userNameInput), 5000)
            })
            .then(() => {
                userNameInput.sendKeys("testuser1")
            })
            .then(() => {
                return driver.findElement(webdriver.By.id("password-input"));
            })
            .then(passwordInput => {
                passwordInput.sendKeys("badpass")
            })
            .then(() => {
                return driver.findElement(webdriver.By.id('login-submit'));
            })
            .then(submitButton => {
                submitButton.click()
            })
            .then(() => {
                driver.wait(webdriver.until.urlIs(searchUrl))
            })
            .then(() => {
                done();
            })
    });
})
;

