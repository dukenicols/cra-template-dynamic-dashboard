import React from 'react';
import { shallow } from 'enzyme';
import Table from 'components/Table';
import { COMPONENTS_DATA } from 'tests/mocks/CriticalComponents';

describe('Table', () => {
    let wrapper, columns, handleClick;

    beforeEach(() => {
        handleClick = jest.fn();
        wrapper = shallow(<Table handleRowClick={handleClick} />);
    });

    it('renders table rows based on provided format and data', () => {
        columns = [
            { label: 'AAMS ID', prop: 'aamsId' },
            { label: 'Version', prop: 'version' },
            { label: 'Origin', prop: 'origin' },
        ];
        wrapper.setProps({ format: columns, data: COMPONENTS_DATA });
        // There should be only 1 table element
        const table = wrapper.find('Bootstrap(Table)');
        expect(table).toHaveLength(1);

        // the table should have only 1 thead element
        const thead = table.find('thead');
        expect(thead).toHaveLength(1);

        // the number of th tags should be equal to number of columns
        const headers = thead.find('th');
        expect(headers).toHaveLength(columns.length);

        // Each th tag text should equal to column label
        headers.forEach((th, idx) => {
            expect(th.text()).toEqual(columns[idx].label);
        });

        // the table should have only 1 tbody tag
        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);

        setTimeout( () => {
            // tbody tag should have the same number of tr tags as data rows
            const rows = tbody.find('tr');
            expect(rows).toHaveLength(COMPONENTS_DATA.length);

            // Loop through each row and check the content
            rows.forEach((tr, rowIndex) => {
                const cells = tr.find('td');
                expect(cells).toHaveLength(columns.length);
                cells.forEach((cell, cellIndex) => {
                    expect(cells.at(cellIndex).text()).toEqual(data[rowIndex].prop);
                });
            });
        }, 0);
    });
});
