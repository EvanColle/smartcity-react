import React, { Component } from 'react'
import {Form,Row, Col, Button} from 'react-bootstrap'
import {getUser} from "../API";



export default class ProfileComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {}
        }
    }

    componentDidMount() {
        getUser(2).then(result => this.setState({user : result[0]}));
        console.log(this.state.user);
    }

    render() {
        return (
            <div>
                <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10"><Form.Control defaultValue={this.state.user.name} /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                            <Form.Label column sm="2">Prénom</Form.Label>
                            <Col sm="10"><Form.Control defaultValue={this.state.user.firstname} /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBirthDate">
                            <Form.Label column sm="2">Date de naissance</Form.Label>
                            <Col sm="10"><Form.Control type="date" defaultValue={this.state.user.birthdate}/></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10"><Form.Control defaultValue={this.state.user.email} /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPassword">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10"><Form.Control type="password" defaultValue={this.state.user.password} /></Col>
                        </Form.Group>

                        <Button variant="primary" type="submit">Changer</Button>
                </Form>
            </div>
        )
    }
}
