import chai from 'chai'
import React from 'react'
import Home from '../src/components/home'
import {shallow} from "enzyme/build/index";

let expect = chai.expect;
describe("<Home/>", ()=>{
    "use strict";
    it('redirects to another page', ()=>{
        const wrapper = shallow(<Home />);
        expect(wrapper.find('Redirect').length).to.be.greaterThan(0);
    });
});