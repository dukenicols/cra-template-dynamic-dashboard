import React, { useState, useEffect, Fragment } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import EditableLabel from 'components/EditableLabel';

import './styles.scss';
import { toast } from 'react-toastify';

const getPlainSchema = (schema) => {
    let object = {};
    schema.columns.forEach((column) => {
        return column.elements.forEach((ele) => {
            return (object[ele.prop] = '');
        });
    });
    return object;
};

const CustomComponents = {};

function DynamicForm({
    schema,
    editable,
    editing,
    onComplete,
    data,
    onDelete,
    onCancel,
    resetForm,
}) {
    const plainSchema = getPlainSchema(schema);
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState(plainSchema);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setIsEditing(editing);
    }, [editing]);

    useEffect(() => {
        setFormState(data);
    }, [data]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        // Validation
        if (form.checkValidity() === false) {
            setValidated(true);
            return false;
        } else {
            const response = await schema.handler(formState);
            if (resetForm) {
                setFormState(plainSchema);
                form.reset();
            }
            setIsEditing(false);
            typeof onComplete === 'function' && onComplete(response.data);
        }
        setValidated(false);
        return true;
    };

    const handleDelete = async (eve, componentUid) => {
        eve.preventDefault();
        eve.stopPropagation();
        const confirmed = window.confirm(
            'Are you sure you want to delete this?'
        );
        if (confirmed) {
            await schema.deleteHandler(componentUid);
            toast.success('Component deleted succesfully!');
            typeof onDelete === 'function' && onDelete();
        }
    };

    const handleCancel = () => {
        if (typeof onCancel === 'function') {
            onCancel();
        } else {
            toggleEdit();
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                {schema.columns.map((column, colIndex) => (
                    <Col md={column.size} key={colIndex}>
                        {column.elements.map((element, elementIndex) => {
                            let Component = EditableLabel;
                            if (
                                Object.keys(CustomComponents).includes(
                                    element.type
                                )
                            ) {
                                Component = CustomComponents[element.type];
                            }
                            const value = formState[element.prop];
                            return (
                                <Form.Group key={elementIndex}>
                                    <Form.Label htmlFor={element.prop}>
                                        {element.label}
                                    </Form.Label>
                                    <Component
                                        type={element.type}
                                        editing={isEditing}
                                        name={element.prop}
                                        onChange={handleChange}
                                        value={value}
                                        required={element.required}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            );
                        })}
                    </Col>
                ))}
            </Form.Row>
            <div className="buttons">
                {editable && !isEditing && (
                    <Fragment>
                        <Button alt="Edit" variant="link" onClick={toggleEdit}>
                            <i className="text-primary fa fa-pencil" />
                        </Button>
                        <Button
                            alt="Delete"
                            variant="link"
                            onClick={(e) =>
                                handleDelete(e, formState.componentUid)
                            }>
                            <i className="text-danger fa fa-trash" />
                        </Button>
                    </Fragment>
                )}
                {isEditing && (
                    <Fragment>
                        <Button
                            type="reset"
                            onClick={handleCancel}
                            variant="outline-danger">
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </Fragment>
                )}
            </div>
        </Form>
    );
}

DynamicForm.defaultProps = {
    data: {},
    editable: false,
    editing: false,
    resetForm: true,
};

export default DynamicForm;
