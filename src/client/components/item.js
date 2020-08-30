import React from 'react';

import {ListGroup, Row, Col, Card} from 'react-bootstrap';

export default function Item(props) {
    const {data, index} = props;
    
    return (
        <ListGroup.Item key={index}>
            <Row>
                <Col className="col-sm-2">
                    <div className="img-fluid thumbnail">
                        <img className="img-fluid thumbnail" src={data.image_url}></img>
                    </div>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <a href={data.url} target="_blank">{data.name}</a>
                        </Col>
                        <Col>
                            {data.rating} ({data.review_count} reviews)
                        </Col>
                        <Col>
                            {data.price}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="ml-3 mt-3">
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col>
                                            Address:
                                        </Col>
                                        <Col>
                                            Phone Number:
                                        </Col>
                                        <Col>
                                            Categories:
                                        </Col>
                                        <Col>
                                            Distance:
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            {data.location.display_address.map((line, i) => <span key={i}>{line}<br /></span>)}
                                        </Col>
                                        <Col>
                                            {data.display_phone}
                                        </Col>
                                        <Col>
                                            {data.categories.map((cat, i) => <span key={i}>{cat.title}<br /></span>)}
                                        </Col>
                                        <Col>
                                            {(data.distance / 1000).toLocaleString(undefined, {maximumFractionDigits: 0})} km
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                
            </Row>
        </ListGroup.Item>
    );
}