import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {postInscription} from "../../Utils/API";
import {Link} from "react-router-dom";

export default class AddInscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid : "",
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

    async submitHandler() {
        if(this.state.userid !== ""  && this.state.eventId !== "")
            await postInscription(this.state).then(res => res.data).catch((error) => alert(error));
        else
            alert("Veuillez compléter les champs");
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de l'utilisateur</Form.Label>
                        <Col sm="4"><Form.Control aria-required={true} value={this.state.userid} onChange={this.handleChange} id="userid" name="userid"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Id de l'événement</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.eventId} onChange={this.handleChange} id="eventId" name="eventId" /></Col>
                    </Form.Group>

                    <Button as={Link} to={"/inscriptions"} onClick={this.submitHandler} variant="primary" >Ajouter l'inscription</Button>
                </Form>
            </div>
        );
    }
}

