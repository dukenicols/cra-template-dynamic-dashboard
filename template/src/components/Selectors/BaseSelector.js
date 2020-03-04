import React from 'react';
import { PropTypes } from 'prop-types';
import { Form } from 'react-bootstrap';

export default function BaseSelector({
    editing,
    required,
    onChange,
    value,
    name,
    data,
    selectLabel,
}) {
    return editing ? (
        <Form.Control
            as="select"
            onChange={onChange}
            value={value}
            required={required}
            name={name}>
            <option value="">{selectLabel ? selectLabel : 'Select...'}</option>
            {data.map((_data, index) => (
                <option key={index}>{_data}</option>
            ))}
        </Form.Control>
    ) : (
        <Form.Label>{value}</Form.Label>
    );
}

BaseSelector.defaultProps = {
    data: [],
    selectLabel: null,
};

BaseSelector.propTypes = {
    data: PropTypes.array,
};
