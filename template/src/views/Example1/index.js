import React, { useState } from 'react';
import { useFetch } from 'hooks';
import { Container, Button } from 'react-bootstrap';

import Table from 'components/Table';
import DrawerForm from 'components/DrawerForm';

import TABLE_SCHEMA from './schemas/table';
import CREATE_SCHEMA from './schemas/create';

import './styles.scss';

const Example1 = () => {
    const [create, setCreate] = useState(false);

    const [data, loading] = useFetch(
        'https://jsonplaceholder.typicode.com/users',
        true
    );

    const handleRowClick = () => {};

    return (
        <Container>
            <div className="actions-container d-flex justify-content-between align-items-center">
                <div className="w-25" />
                <div className="align-self-end">
                    <Button
                        className="btn-create"
                        onClick={() => setCreate(!create)}>
                        Create new
                    </Button>
                </div>
            </div>
            <DrawerForm
                onClose={() => setCreate(false)}
                isOpen={create}
                schema={CREATE_SCHEMA}
            />
            <Table
                format={TABLE_SCHEMA}
                handleRowClick={handleRowClick}
                loading={loading}
                data={data}
            />
        </Container>
    );
};

export default Example1;
