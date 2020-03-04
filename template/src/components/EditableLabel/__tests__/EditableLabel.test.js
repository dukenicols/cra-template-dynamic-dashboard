import React from 'react';
import { shallow } from 'enzyme';
import EditableLabel from '../index';

describe('EditableLabel', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<EditableLabel />);
    });

    it('should render a FormLabel or FormControl based on editing prop', () => {
        wrapper.setProps({ editing: false });
        expect(wrapper.find('FormControl').exists()).toBe(false);
        expect(wrapper.find('FormLabel').exists()).toBe(true);
        wrapper.setProps({ editing: true });
        expect(wrapper.find('FormControl').exists()).toBe(true);
        expect(wrapper.find('FormLabel').exists()).toBe(false);
    });

    it('should pass down props to FormControl', () => {
        const props = {
            required: true,
            onChange: jest.fn(),
            type: 'text',
            name: 'test',
            value: ''
        };
        wrapper.setProps({editing: true, ...props });
        expect(wrapper.find('FormControl').props()).toMatchObject(props);
    });

    it('should match snapshot', () => {
       expect(wrapper).toMatchSnapshot();
    });
});