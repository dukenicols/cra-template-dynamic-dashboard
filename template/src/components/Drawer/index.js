import React, { Fragment, useEffect } from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import './styles.scss';

export default function Drawer({ title, isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);
    return (
        <Fragment>
            {isOpen && <div className="drawer-outside" onClick={onClose} />}
            <div
                className={cn('drawer', {
                    'drawer-open': isOpen,
                })}>
                <div className="drawer-header">
                    {typeof title === 'string' ? <h2>{title}</h2> : title}
                    <Button
                        size="sm"
                        className="btn-close"
                        variant="outline-danger"
                        onClick={onClose}>
                        X
                    </Button>
                </div>
                <div className="drawer-body">{children}</div>
            </div>
        </Fragment>
    );
}
