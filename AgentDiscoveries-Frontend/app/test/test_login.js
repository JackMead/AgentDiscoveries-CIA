import chai from 'chai'
import React from 'react'
import App from '../src/components/app'
import {shallow} from 'enzyme'

let expect = chai.expect;

describe("<App/>", ()=>{
    "use strict";
    it('renders one <div> tag', ()=>{
        const wrapper = shallow(<App />);
        expect(wrapper.find('div')).to.have.length(0)
    });
});