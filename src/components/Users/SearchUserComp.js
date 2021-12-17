import React, {Component} from 'react';
import {getUser} from "../API";
import {Button, Col, Form, Row} from "react-bootstrap";

class SearchUserComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId: "",
            searchUser: {},
            firstname : "",
            name : "",
            birthdate : "",
            isAdmin : false,
            email : "",
            password : ""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleModification = this.handleModification.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        this.setState({
                [name] : e.target.value,
            }
        )
    }

    handleSearch(e){
        e.preventDefault();
        getUser(this.state.searchId).then(result => this.setState(
            {searchUser : result[0],
                firstname : result[0].firstname,
                name : result[0].name,
                birthdate : Date.parse(result[0].birthdate),
                isAdmin : result[0].isAdmin,
                email : result[0].email,
                password : result[0].password,

            }));

    }

    handleModification(e){
        e.preventDefault();
        const modifiedUser = {
            firstname : this.state.firstname,
            name : this.state.name,
            birthdate : this.state.birtdate,
            isAdmin : this.state.isAdmin,
            email : this.state.email,
            password : this.state.password
        }
        //JSON.stringify(modifiedUser);
        console.log(JSON.stringify(modifiedUser))

    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de l'utilisateur à  rechercher</Form.Label>
                        <Col sm="2"><Form.Control value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId"/></Col>
                    </Form.Group>
                    <Button onClick={this.handleSearch} variant="primary" >Recherche</Button>
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
                        <Col sm="1"><Form.Check value={this.state.isAdmin} onChange={this.handleChange} id="isAdmin" name="isAdmin" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="4"><Form.Control type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de naissance</Form.Label>
                        <Col sm="4"><Form.Control type="password" value={this.state.password} onChange={this.handleChange} id="password" name="password" /></Col>
                    </Form.Group>

                    <Button onClick={this.handleModification} variant="primary" >Modifier l'utilisateur</Button>
                </Form>
            </div>
        );
    }
}

export default SearchUserComp;