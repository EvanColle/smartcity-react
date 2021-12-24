import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {postUser} from "../../Utils/API";
import {Link} from "react-router-dom";

export default class AddUserComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            birthdate : "",
            isadmin : true,
            email : "",
            password : "",
            photopath: "c:/photos/1"
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }


    handleChange(e){
        const name = e.target.name;
        const type = e.target.type;
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
                [name] : value,
            }
        )
    }

    async submitHandler() {
        let isValid = true;
        const regexDate = /^\d{4}[-]\d{2}[-]\d{2}$/
        for (const state in this.state ) {
            if((this.state[state] === "" || this.state[state] === undefined))
                isValid = false;
            else if (state === "birthdate"){
                if(!this.state[state].match(regexDate))
                    isValid = false;
            }
        }

        isValid ? await postUser(this.state).then(res => res.data).catch((error) => alert(error)) : alert("Veuillez remplir tous les champs et la date doit être au format yyyy-mm-dd");


    }

    render() {
        return (
            <div className="container">
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Prénom</Form.Label>
                        <Col sm="4"><Form.Control  value={this.state.firstname} onChange={this.handleChange} id="firstname" name="firstname"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Nom</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.name} onChange={this.handleChange} id="lastname" name="lastname" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de naissance</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.birthdate.slice(0,10)} onChange={this.handleChange} id="birthdate" name="birthdate" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="4"><Form.Control  type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Mot de passe</Form.Label>
                        <Col sm="4"><Form.Control type="password" value={this.state.password} onChange={this.handleChange} id="password" name="password" /></Col>
                    </Form.Group>

                    <Button as={Link} to={"/users"} onClick={this.submitHandler} variant="primary" >Ajouter l'utilisateur</Button>
                </Form>

            </div>
        );
    }
}

