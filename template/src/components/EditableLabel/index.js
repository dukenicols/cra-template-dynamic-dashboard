import React from 'react';
import { Form } from 'react-bootstrap';
import './styles.scss';

export default function EditableLabel({ value, editing, ...rest }) {
    return editing ? (
        <Form.Control value={value} {...rest} />
    ) : (
        <Form.Label>{value}</Form.Label>
    );
}

EditableLabel.defaultProps = {
    editing: true,
    required: false,
    onChange: () => {},
    type: 'text',
    name: '',
    value: '',
};
