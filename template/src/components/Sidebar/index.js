import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './styles.scss';

function Sidebar({ pages }) {
    return (
        <div className="sidebar-menu">
            <Nav className="flex-column">
                {pages.map((route, index) => {
                    const key = `nav-item-${index}`;
                    return (
                        <Nav.Item key={key}>
                            <Link to={route.path}>
                                {route.name}
                            </Link>
                        </Nav.Item>
                    );
                })}
            </Nav>
        </div>
    );
}

Sidebar.defaultProps = {
    pages: [],
};

Sidebar.propTypes = {
    pages: PropTypes.array,
    onChange: PropTypes.func,
};

export default Sidebar;
