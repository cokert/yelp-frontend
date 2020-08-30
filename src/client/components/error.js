import React from 'react';

import { Row, Col, Jumbotron, Alert } from 'react-bootstrap';

export default function Error(props) {
    const { error } = props
    console.log("error", error)
    return (
        <Row>
            <Col>
                <Alert variant="danger">
                    Oops, something went wrong: {error.message}
                </Alert>
            </Col>
        </Row>
    );
}
