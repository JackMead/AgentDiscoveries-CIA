import chai from 'chai'
import React from 'react'
import App from '../src/components/app'
import {shallow} from 'enzyme'
import * as webdriver from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'
//The next import is required to ensure chromedriver is on the system path,
// even if it isn't explicitly used
import * as chromeDriver from 'chromedriver';

let expect = chai.expect;

describe("login-page", () => {
    "use strict";
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
    const url = process.argv[process.argv.length-1].valueOf();
    const loginUrl = url+"/#/login";

    after(function () {
        driver.quit();
    });


    it('loads', function (done) {
        this.timeout(5000);
        driver.get(loginUrl)
            .then(driver.getPageSource()
                .then(result => {
                    driver.getTitle().then(res => {
                        console.log("Title: " + res);
                        expect(res).to.equal("Agent Discoveries")
                        done();
                    })
                }))
    });

    it('has a submit button', function (done) {
        this.timeout(5000);
        driver.get(loginUrl)
            .then(_ => {
                const element = driver.findElement(webdriver.By.id('login-submit'));
                driver.wait(webdriver.until.elementIsVisible(element), 5000)
                    .then(_ => {
                        let el = driver.findElement(webdriver.By.id('login-submit'));
                        el.then(element => {
                            element.getTagName().then(tag => {
                                console.log(tag);
                                expect(tag).to.equal('button');
                                done();
                            })
                        })
                    })
            })
    });

    it('cannot log in without credentials', function (done) {
        this.timeout(8000);
        driver.get(loginUrl)
            .then(() => {
                const element = driver.findElement(webdriver.By.id('login-submit'));
                driver.wait(webdriver.until.elementIsVisible(element), 5000)
                    .then(() => {
                        element.click().then(_ => {
                            //check page hasn't changed
                            driver.getCurrentUrl().then(url => {
                                expect(url).to.equal(loginUrl);
                                done();
                            })
                        })
                    })
            })
    });

    it('can log in with credentials', function (done) {
        this.timeout(8000);
        const searchUrl = url+"/#/search/location";
        driver.get(loginUrl)
            .then(() => {
                const userNameInput = driver.findElement(webdriver.By.id('user-name-input'));
                driver.wait(webdriver.until.elementIsVisible(userNameInput), 5000)
                    .then(() => {
                        userNameInput.sendKeys("testuser1")
                            .then(_ => {
                                const passwordInput = driver.findElement(webdriver.By.id("password-input"));
                                passwordInput
                                    .then(_ => {
                                        passwordInput.sendKeys("badpass")
                                            .then(_ => {
                                                const submitButton = driver.findElement(webdriver.By.id('login-submit'));
                                                submitButton
                                                    .then(_ => {
                                                        submitButton.click()
                                                            .then(_ => {
                                                                driver.wait(webdriver.until.urlIs(searchUrl))
                                                                    .then(_ => {
                                                                        done();
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
});

