import React, {Component} from 'react';
import {getEvent} from "../API";
import {Button, Col, Form, Row} from "react-bootstrap";

class SearchEventComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchId: "",
            searchEvent: {},
            creatorId: "",
            gameCategory: "",
            eventDate: "",
            street: "",
            number: "",
            country: "",
            city: "",
            postalCode: "",
            eventDescription: "",
            isVerified: false,
            nbMaxPlayer: "",
            adminMessage: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleModification = this.handleModification.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({
                [name]: e.target.value,
            }
        )
    }

    handleSearch(e) {
        e.preventDefault();
        getEvent(this.state.searchId).then(result => this.setState(
            {
                searchEvent: result,
                creatorId: result.user.userid,
                gameCategory: result.gamecategory.gamecategoryid,
                eventDate: result.eventdate,
                street: result.address.street,
                number: result.address.number,
                country: result.address.country,
                city: result.address.city,
                postalCode: result.address.postalcode,
                eventDescription: result.eventdescription,
                isVerified: result.isverified,
                nbMaxPlayer: result.nbmaxplayer,
                adminMessage: result.adminmessage
            }));
    }

    handleModification(e) {
        e.preventDefault();
        const modifiedEvent = {
            creatorId: this.state.creatorId,
            gameCategory: this.state.gameCategory,
            eventDate: this.state.eventDate,
            street: this.state.street,
            number: this.state.number,
            country: this.state.country,
            city: this.state.city,
            postalCode: this.state.postalCode,
            eventDescription: this.state.eventDescription,
            isVerified: this.state.isVerified,
            nbMaxPlayer: this.state.nbMaxPlayer,
            adminMessage: this.state.adminMessage
        }
        console.log(JSON.stringify(modifiedEvent))
    }

    render() {
        return (
            <div className="container-fluid">
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id de l'événement à rechercher</Form.Label>
                        <Col sm="2"><Form.Control value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId"/></Col>
                    </Form.Group>
                    <Button onClick={this.handleSearch} variant="primary" >Recherche</Button>


                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id du créateur</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.creatorId} onChange={this.handleChange} id="creatorId" name="creatorId"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Catégorie de jeu</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.gameCategory} onChange={this.handleChange} id="gameCategory" name="gameCategory" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de l'événement</Form.Label>
                        <Col sm="4"><Form.Control type="date" value={this.state.birthdate} onChange={this.handleChange} id="birthdate" name="birthdate" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Rue</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.street} onChange={this.handleChange} id="street" name="street" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Numéro</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.number} onChange={this.handleChange} id="number" name="number" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Pays</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.country} onChange={this.handleChange} id="country" name="country" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Ville</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.city} onChange={this.handleChange} id="city" name="city" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Code postal</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.postalCode} onChange={this.handleChange} id="postalCode" name="postalCode" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Description</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.eventDescription} onChange={this.handleChange} id="eventDescription" name="eventDescription" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Nombre max de participants</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.nbMaxPlayer} onChange={this.handleChange} id="nbMaxPlayer" name="nbMaxPlayer" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Note de l'admin</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.adminMessage === null ? "" : this.state.adminMessage} onChange={this.handleChange} id="adminMessage" name="adminMessage" /></Col>
                    </Form.Group>

                    <Button onClick={this.handleModification} variant="primary" >Modifier l'événement</Button>

                </Form>
            </div>
        );
    }
}
export default SearchEventComp;