import React from 'react';
import { Container } from 'react-bootstrap';

import Drawer from 'components/Drawer';
import DynamicForm from 'components/DynamicForm';

export default function DrawerForm({ schema, isOpen, onClose, onComplete }) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Create Critical Component Module">
            <Container>
                <DynamicForm
                    schema={schema}
                    onComplete={onComplete}
                    onCancel={onClose}
                    editing={true}
                    editable={false}
                />
            </Container>
        </Drawer>
    );
}
