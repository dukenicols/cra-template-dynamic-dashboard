import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

import DynamicForm from 'components/DynamicForm';
import './styles.scss';

function ComponentModules({ schema, modules, onComplete }) {
    return (
        <Accordion defaultActiveKey="0">
            {modules.map((module, index) => {
                const key = `module-${index}`;
                return (
                    <Card key={key}>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                            <div className="title-container">
                                <Card.Title>
                                    {`${module[schema.titleKey]}`}
                                </Card.Title>
                                <Card.Text>{module[schema.subtitleKey]}</Card.Text>
                            </div>
                            <Button variant="link">
                                <i className="text-primary fa fa-chevron-down" />
                            </Button>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>
                                <DynamicForm
                                    schema={schema}
                                    data={module}
                                    onComplete={onComplete}
                                    resetForm={false}
                                    editable={true}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            })}
        </Accordion>
    );
}

ComponentModules.defaultProps = {
    modules: [],
};

export default ComponentModules;
