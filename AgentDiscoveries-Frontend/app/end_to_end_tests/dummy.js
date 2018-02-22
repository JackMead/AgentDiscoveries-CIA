import chai from 'chai'
import React from 'react'
import App from '../src/components/app'
import {shallow} from 'enzyme'
import * as webdriver from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'
//The next line is required to ensure chromedriver is on the system path,
// even if it isn't explicitly used
import * as chromeDriver from 'chromedriver';

let expect = chai.expect;

describe("<App/>", () => {
    "use strict";
    it('renders one <div> tag', (done) => {
        console.log("output");
        const wrapper = shallow(<App/>);
        expect(wrapper.find('div')).to.have.length(0)
        done();
    });
});

describe("Can log in", () => {
    "use strict";
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    after(function () {
        driver.quit();
    });


    it('loads the login page', function (done) {
        this.timeout(5000);
        driver.get("http://localhost:8080")
            .then(driver.getPageSource()
                .then(result => {
                    driver.getTitle().then(res => {
                        console.log("Title: " + res);
                        expect(res).to.equal("Agent Discoveries")
                        done();
                    })
                }))
    });

    it('can find an element on the page', function (done) {
        this.timeout(5000);
        driver.get("http://localhost:8080")
            .then(driver.getPageSource()
                .then(_ => {
                    const element = driver.findElement(webdriver.By.id('login-submit'));
                    driver.wait(webdriver.until.elementIsVisible(element), 10000)
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
                }))
    })
})

