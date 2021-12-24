import React, {Component} from 'react';
import {getEvent, getEvents, updateEvent, verifyEvent} from "../../Utils/API";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class SearchEventComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchId: 1,
            selectOptions : [],
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

    componentDidMount() {
        this.getSelectOptions();
        console.log(this.state.searchId);
    }

    getSelectOptions(){
        getEvents().then( res => this.setState({selectOptions : res})).catch((error) => alert(error));
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
            })).catch((error) => alert(error));
    }

    async handleModification() {

        let isValid = true;
        const regexDate = /^\d{4}[-]\d{2}[-]\d{2}$/;
        let errorMessage = "";

        const modifiedEvent = {
            creatorId: this.state.creatorId,
            gameCategory: this.state.gameCategory,
            eventDate: this.state.eventDate.slice(0,10),
            street: this.state.street,
            number: this.state.number,
            country: this.state.country,
            city: this.state.city,
            postalCode: this.state.postalCode,
            eventDescription: this.state.eventDescription,
            nbMaxPlayer: this.state.nbMaxPlayer,
            adminMessage: this.state.adminMessage
        }

        for (const modifiedEventKey in modifiedEvent ) {

            if(modifiedEvent[modifiedEventKey] === "eventDate") {
                if (!modifiedEvent[modifiedEventKey].match(regexDate)) {
                    errorMessage += "la date doit être rentrée au format yyyy-mm-dd : (" + modifiedEventKey + ')\n'
                    isValid = false;
                }
            }
            else if(modifiedEvent[modifiedEventKey] === ""){
                errorMessage += "Ce champ doit être complété : (" + modifiedEventKey + ')\n'
                isValid = false;
            }
        }

        isValid ? await updateEvent(this.state.searchId, modifiedEvent).then(res => res).catch((error) => alert(error)) : alert(errorMessage);

        const verification = {
            adminMessage : this.state.adminMessage,
            isVerified : this.state.isVerified
        }
        await verifyEvent(this.state.searchId, verification).then(res => res).catch((error) => alert(error));
    }

    render() {
        return (
            <div className="container-fluid">
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Evénements</Form.Label>
                        <Col sm="4">
                            <Form.Select value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId">
                                {this.state.selectOptions.map(
                                    item => (<option key={parseInt(item.eventid)} value={parseInt(item.eventid)}> {`${parseInt(item.eventid)} - ${item.eventdescription} (${item.eventdate.slice(0,10)})`} </option>)
                                )}
                            </Form.Select>
                        </Col>
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
                        <Col sm="4"><Form.Control type="text" value={this.state.eventDate.slice(0,10)} onChange={this.handleChange} id="eventDate" name="eventDate" /></Col>
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

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Est vérifié</Form.Label>
                        <Col sm="1"><Form.Check checked={this.state.isVerified} onChange={this.handleChange} id="isVerified" name="isVerified" /></Col>
                    </Form.Group>

                    <Button as={Link} to={"/events"} onClick={this.handleModification} variant="primary" >Modifier l'événement</Button>

                </Form>
            </div>
        );
    }
}
