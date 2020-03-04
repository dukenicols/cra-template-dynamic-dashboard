import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import ROUTES from 'routes';
import Sidebar from 'components/Sidebar';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

export default function App() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Dynamic Dashboard</Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col sm={2} className="p-0">
                        <Sidebar pages={ROUTES} />
                    </Col>
                    <Col sm={10}>
                        <Switch>
                            {ROUTES.map((ROUTE, index) => {
                                const key = `route-${index}`;
                                return (
                                    <Route
                                        key={key}
                                        exact
                                        path={ROUTE.path}
                                        component={ROUTE.view}
                                    />
                                );
                            })}
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Router>
    );
}
