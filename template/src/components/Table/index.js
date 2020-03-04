import React, { Fragment, useState, useEffect } from 'react';
import { Table as RSTable, Row, Col } from 'react-bootstrap';

import './styles.scss';
import Pagination from './components/Pagination';

export default function Table({
    custom,
    format,
    data,
    loading,
    handleRowClick,
    ...rest
}) {
    const [pagination, setPagination] = useState({
        currentData: [],
        currentPage: null,
        totalPages: null,
    });

    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const onPageChanged = (pageData) => {
        const { currentPage, totalPages, pageLimit } = pageData;
        const offset = (currentPage - 1) * pageLimit;
        const currentData = localData.slice(offset, offset + pageLimit);
        setPagination({
            currentPage,
            currentData,
            totalPages,
        });
    };

    const renderTableHeader = () => {
        const columns = format.map((ele, i) => (
            <th key={`th-${i}`}>{ele.label}</th>
        ));
        return (
            <thead>
                <tr>{columns}</tr>
            </thead>
        );
    };

    const getComponentStatus = (status) => {
        switch (true) {
            case status === 0:
                return 'success';
            case status > 0:
                return 'danger';
            default:
                return 'secondary';
        }
    };

    const renderTableBody = (currentData) => {
        const Custom = custom;
        const COLUMNS = Object.values(format).map((column) => column.prop);

        const rows = currentData.map((row, index) => {
            const status = getComponentStatus(row.statusCode);
            return (
                <tr
                    key={index}
                    className={`table-${status}`}
                    onClick={handleRowClick.bind(null, row)}>
                    {COLUMNS.map((COLUMN, __i) => {
                        const ROW = row[COLUMN];
                        const idx = `row-${index}-${__i}`;
                        if (COLUMN === 'custom') {
                            return (
                                <td key={idx}>
                                    <Custom
                                        key={idx}
                                        status={status}
                                        message={row.statusMessage}
                                    />
                                </td>
                            );
                        }
                        return <td key={idx}>{ROW}</td>;
                    })}
                </tr>
            );
        });
        return <tbody>{rows}</tbody>;
    };

    const totalData = localData.length;
    if (loading) {
        return <span>Loading...</span>;
    }
    if (totalData === 0) {
        return <span>No data found</span>;
    }

    const { currentPage, totalPages, currentData } = pagination;

    return (
        <Fragment>
            <RSTable {...rest}>
                {renderTableHeader()}
                {renderTableBody(currentData)}
            </RSTable>
            <Row>
                <Col>
                    {currentPage && (
                        <span className="current-page d-inline-block h-100 text-secondary">
                            Page{' '}
                            <span className="font-weight-bold">
                                {currentPage}
                            </span>{' '}
                            /{' '}
                            <span className="font-weight-bold">
                                {totalPages}
                            </span>
                        </span>
                    )}
                    <span className="text-secondary ml-3">
                        <span className="font-weight-bold">{totalData}</span>{' '}
                        Entries
                    </span>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Pagination
                        totalRecords={totalData}
                        pageLimit={10}
                        pageNeighbours={1}
                        onPageChanged={onPageChanged}
                    />
                </Col>
            </Row>
        </Fragment>
    );
}

Table.defaultProps = {
    data: [],
    loading: true,
};
