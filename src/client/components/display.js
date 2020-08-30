import React from 'react';
import PropTypes from 'prop-types';

import {ListGroup, Row, Col} from 'react-bootstrap';

import Item from './item.js';

export default function Display(props) {
    const {businesses} = props.data;
    const {term, location} = props.search;
    return (
        <>
            <h1>{term} in {location}</h1>
            <ListGroup>
                <ListGroup.Item key={0}>
                    <Row>
                        <Col className="col-sm-2"></Col>
                        <Col>
                        <Row>
                            <Col>Name</Col>
                            <Col>Rating</Col>
                            <Col>Price</Col>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {businesses.map((b, index) => {
                    return (
                        <Item key={index} data={b} index={index} />
                    );
                })}
            </ListGroup>
        </>
    );
}

Display.propTypes = {
  children: PropTypes.node,
};