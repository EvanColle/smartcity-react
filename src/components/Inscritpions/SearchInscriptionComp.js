import React, {Component} from 'react';
import {getUser} from "../API";
import {Button, Col, Form, Row} from "react-bootstrap";

class SearchInscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId: "",
            searchInscription: {},
            creatorId : "",
            eventId : "",

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
            {searchInscription : result[0],
                creatorId : result[0].creatorId,
                eventId : result[0].eventId,
            }));

    }

    handleModification(e){
        e.preventDefault();
        const modifiedInscription = {
            creatorId : this.state.creatorId,
            eventId : this.state.eventId,

        }
        //JSON.stringify(modifiedInscription);
        console.log(JSON.stringify(modifiedInscription))
    }

    render() {
        return (
            <div>
                <Form>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de la catégorie à rechercher</Form.Label>
                        <Col sm="2"><Form.Control value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId"/></Col>
                    </Form.Group>

                    <Button onClick={this.handleSearch} variant="primary" >Recherche</Button>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de l'utilisateur</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.userId} onChange={this.handleChange} id="userId" name="userId"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Id de l'événement</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.eventId} onChange={this.handleChange} id="eventId" name="eventId" /></Col>
                    </Form.Group>

                    <Button onClick={this.handleModification} variant="primary" >Modifier l'inscription</Button>
                </Form>

            </div>
        );
    }
}

export default SearchInscriptionComp;