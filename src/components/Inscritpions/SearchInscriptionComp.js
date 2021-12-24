import React, {Component} from 'react';
import {getInscription, getInscriptions, updateInscription} from "../../Utils/API";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class SearchInscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId: 1,
            categoriesOptions : [],
            searchInscription: {},
            userId : "",
            eventId : "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
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
        getInscription(this.state.searchId).then(result => this.setState(
            {searchInscription : result[0],
                userId : result[0].userid,
                eventId : result[0].eventid,
            })).catch((error) => alert(error));
    }

    getSelectOptions(){
        getInscriptions().then( res => this.setState({categoriesOptions : res })).catch((error) => alert(error));
    }
    componentDidMount() {
       this.getSelectOptions()
    }

    async handleModification(){
        if(this.state.userid !== ""  || this.state.eventId !== ""){
            const modifiedInscription = {userId : this.state.userId, eventId : this.state.eventId}
            await updateInscription(this.state.searchId, modifiedInscription).then(res => res).catch((error) => alert(error));
        }
        else
            alert("Veuillez remplir les champs");
    }

    render() {
        return (
            <div>
                <Form>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Catégories de jeu</Form.Label>
                        <Col sm="5">
                            <Form.Select value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId">
                                {this.state.categoriesOptions.map(
                                    item => (<option key={parseInt(item.inscriptionid)} value={parseInt(item.inscriptionid)}> {`${parseInt(item.inscriptionid)} - ${item.firstname} ${item.name} - ${item.eventdescription} `} </option>)
                                )}
                            </Form.Select>
                        </Col>
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

                    <Button as={Link} to={"/inscriptions"} onClick={this.handleModification} variant="primary" >Modifier l'inscription</Button>
                </Form>

            </div>
        );
    }
}
