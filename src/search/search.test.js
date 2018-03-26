import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
import { shallow, mount, render } from 'enzyme';
import '../setupTests';

it('renders without crashing', () => {
    const wrapper = shallow(<Search/>);

    const input = wrapper.find('input').first();
    input.simulate('change', {target: {value: '04918-010'}});

    const button = wrapper.find('button').first();
    button.simulate('click');
});