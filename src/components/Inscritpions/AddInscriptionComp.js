import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

class AddInscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId : "",
            eventId : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    handleChange(e){
        const name = e.target.name;
        this.setState({
                [name] : e.target.value,
            }
        )
    }
    // TO DO : faire appel à la méthode d'ajout : demander à Augustin
    submitHandler(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        console.log(data);
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de l'utilisateur</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.userId} onChange={this.handleChange} id="userId" name="userId"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Id de l'événement</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.eventId} onChange={this.handleChange} id="eventId" name="eventId" /></Col>
                    </Form.Group>

                    <Button onClick={this.submitHandler} variant="primary" >Ajouter l'inscription</Button>
                </Form>
            </div>
        );
    }
}

export default AddInscriptionComp;