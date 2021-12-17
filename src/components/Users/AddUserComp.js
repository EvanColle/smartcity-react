import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {addUser} from "../API/http";

class AddUserComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname : "",
            name : "",
            birthdate : "",
            isAdmin : false,
            email : "",
            password : ""

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
        const formatedDate = this.state.birthdate.toString().slice(5,7) + "-" + this.state.birthdate.toString().slice(8,10) + "-" + this.state.birthdate.toString().slice(0,4) ;
        this.setState({birthdate : formatedDate})
        //await addUser(this.state);
        console.log(formatedDate);
    }



    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Prénom</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.firstname} onChange={this.handleChange} id="firstname" name="firstname"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Nom</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.name} onChange={this.handleChange} id="name" name="name" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de naissance</Form.Label>
                        <Col sm="4"><Form.Control type="date" value={this.state.birthdate} onChange={this.handleChange} id="birthdate" name="birthdate" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Est admin</Form.Label>
                        <Col sm="1"><Form.Check checked={this.state.isAdmin} onChange={this.handleChange} id="isAdmin" name="isAdmin" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="4"><Form.Control  type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Mot de passe</Form.Label>
                        <Col sm="4"><Form.Control type="password" value={this.state.password} onChange={this.handleChange} id="password" name="password" /></Col>
                    </Form.Group>

                    <Button onClick={this.submitHandler} variant="primary" >Ajouter l'utilisateur</Button>
                </Form>

            </div>
        );
    }
}

export default AddUserComp;