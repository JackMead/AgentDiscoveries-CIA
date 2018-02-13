import chai from 'chai'
import React from 'react'
import Test from '../src/components/test'
import {shallow} from 'enzyme'

let expect = chai.expect

describe("<Test/>", ()=>{
    "use strict";
    it('renders one <div> tag', ()=>{
        const wrapper = shallow(<Test />);
        expect(wrapper.find('div')).to.have.length(1)
    });
})