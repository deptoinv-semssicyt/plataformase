import React from 'react'
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

const Add = () => (
    <Container>
        <Row>
            <Col />

            <Col xs={6}>
                <Card>
                    <Card.Title className="mt-5 ml-3">Estampar un nuevo documento</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre del documento:</Form.Label>
                                <Form.Control type="text" placeholder="Nombre del documento" />
                            </Form.Group>
                            
                            <Form.Group controlId="formDesc">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Group controlId="formArchivo">
                                <Form.File label="Archivo a estampar" />
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Estampar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            
            <Col />
        </Row>
    </Container>
)

export default Add;