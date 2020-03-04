import React from 'react';
import { mount, shallow } from 'enzyme';
import Pagination from '../Pagination';

describe('Pagination', () => {
    it('should call gotoPage when mounted', () => {
        const totalRecords = 10;
        const wrapper = shallow(<Pagination totalRecords={totalRecords} />);
        const instance = wrapper.instance();
        const gotoPageSpy = jest.spyOn(instance, 'gotoPage');
        expect(wrapper.state('currentPage')).toBe(1);
        instance.componentDidMount();
        expect(gotoPageSpy).toHaveBeenCalledTimes(1);
        expect(gotoPageSpy).toHaveBeenCalledWith(1);
        expect(wrapper.state('currentPage')).toBe(1);

        // Check inner properties
        expect(instance.pageLimit).toBe(30); // default
        expect(instance.totalRecords).toBe(totalRecords);
        expect(instance.pageNeighbours).toBe(0); // default
        expect(instance.totalPages).toBe(1);
    });

    it('should trigger onPageChanged onClick', () => {
        const onPageChangedMock = jest.fn();
        const wrapper = shallow(
            <Pagination totalRecords={3000} onPageChanged={onPageChangedMock} />
        );
        // on componentDidMount
        expect(onPageChangedMock).toHaveBeenCalledTimes(1);
        wrapper.find('a.page-link').at(1).simulate('click', { preventDefault() {} });
        // after click on gotoPage
        expect(onPageChangedMock).toHaveBeenCalledTimes(2);
        expect(onPageChangedMock).toHaveBeenCalledWith({
            currentPage: 2,
            totalPages: 100,
            pageLimit: 30,
            totalRecords: 3000
        });
    });
});
