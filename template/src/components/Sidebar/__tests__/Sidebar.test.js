import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../index';

describe('Sidebar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Sidebar pages={[]} />);
    });

    it('should render a .sidebar-menu', () => {
        expect(wrapper.exists('.sidebar-menu')).toEqual(true);
    });

    it('should render the menus according to pages prop', () => {
        const testRoutes = [
            {
                name: 'Test 1',
                path: 'test1',
            },
            {
                name: 'Test 2',
                path: 'test2',
            },
        ];
        wrapper.setProps({ pages: testRoutes });
        expect(wrapper.find('NavItem')).toHaveLength(testRoutes.length);
        expect(
            wrapper
                .find('Link')
                .first()
                .text()
        ).toBe(testRoutes[0].name);
        expect(
            wrapper
                .find('Link')
                .last()
                .text()
        ).toBe(testRoutes[testRoutes.length - 1].name);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
