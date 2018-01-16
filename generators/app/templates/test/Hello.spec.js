import React from 'react'
import {Hello, H50 } from '../src/routes/Hello'
import { shallow } from 'enzyme'

const setup = () => {
  const props = {
    text: "hello"
  }
  const wrapper = shallow(<H50>{props.text}</H50>)
  const hello = shallow(<Hello {...props} />)
  return {
    props,
    wrapper,
    hello
  }
}

describe('Hello', () => {
  const {props, wrapper, hello} = setup();
  it('Hello Component should be render', () => {
    expect(wrapper.find('.h50').exists());
  });

  it('Hello Component click', () => {
    expect(hello.find('.container').simulate('click'));
  });
})