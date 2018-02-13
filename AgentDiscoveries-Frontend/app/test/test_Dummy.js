import chai from 'chai'
import React from 'react'
import App from '../src/components/app'
import {shallow} from 'enzyme'

let expect = chai.expect;

describe("<Test/>", ()=>{
    "use strict";
    it('renders one <div> tag', ()=>{
        const wrapper = shallow(<App />);
        expect(wrapper.find('.col-md-12')).to.have.length(1);
    });
});