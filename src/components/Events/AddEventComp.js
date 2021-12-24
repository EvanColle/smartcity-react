import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {addEvent, getGameCategories, getUsers} from "../../Utils/API";
import {Link} from "react-router-dom";
import {isNumber} from "axios/lib/utils";

export default class AddEventComp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            creatorsOptions : [],
            categoriesOptions : [],
            creatorId : 1,
            gameCategoryId : 1,
            eventDate : "",
            street : "",
            number : "",
            country : "",
            city : "",
            postalCode : "",
            eventDescription : "",
            nbMaxPlayer : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
    }

    getSelectOptions(){
         getUsers().then( res => this.setState({creatorsOptions : res}));
         getGameCategories().then(res => this.setState({categoriesOptions : res }));
    }
    componentDidMount() {
        this.getSelectOptions()
    }

    handleChange(e){
        const name = e.target.name;
        this.setState({
                [name] : e.target.value,
            }
        )
    }

    async submitHandler() {

        let isValid = true;
        const regexDate = /^\d{4}[-]\d{2}[-]\d{2}$/;
        let errorMessage = "";
        const addedEvent = {
            creatorid: parseInt(this.state.creatorId),
            gamecategory : {
                gamecategoryid : parseInt(this.state.creatorId)
            },
            eventdate : this.state.eventDate.toString(),
            eventdescription : this.state.eventDescription,
            nbmaxplayer : parseInt(this.state.nbMaxPlayer) ,
            address : {
                street : this.state.street,
                number : parseInt(this.state.number),
                country : this.state.country,
                city : this.state.city,
                postalcode : parseInt(this.state.postalCode) ,
            }
        };

        for (const addedEventKey in addedEvent ) {

            if(addedEventKey === "nbmaxplayer" || addedEventKey === "creatorid" ){
                if(isNaN(addedEvent[addedEventKey])){
                    errorMessage += " Mauvaise syntaxe : veuillez rentrer obligatoirement un nombre (" + addedEventKey + ')\n';
                    isValid = false;
                }
            }
            else if(addedEventKey === "eventdate"){
                if(!addedEvent[addedEventKey].match(regexDate)){
                    errorMessage += " Mauvaise syntaxe :  veuillez suivre le format yyyy-mm-jj (" + addedEventKey + ')\n';
                    isValid = false;
                }
            }
            else if(addedEventKey === "gamecategory"){
                if(isNaN(addedEvent[addedEventKey].gamecategoryid) || addedEvent[addedEventKey].gamecategoryid.toString() === ""){
                    errorMessage += " Mauvaise syntaxe : " + addedEventKey + '\n';
                    isValid = false;
                }
            }
            else if(addedEventKey === "address") {
                if (isNaN(addedEvent[addedEventKey].postalcode)  && isNaN(addedEvent[addedEventKey].number)){
                    errorMessage += " Mauvaise syntaxe : nombre obligatoire pour le Code postal et le Numéro (" + addedEventKey + ')\n';
                    isValid = false;
                }
                if (addedEvent[addedEventKey].street === "" && addedEvent[addedEventKey].city === "" && addedEvent[addedEventKey].country === ""){
                    errorMessage += " Mauvaise syntaxe : auncune chaine ne peut être vide (" + addedEventKey + ')\n';
                    isValid = false;
                }
            }
            else {
                if(addedEventKey === "eventdescription")
                    if(addedEvent[addedEventKey] === ""){
                        errorMessage += " Mauvaise syntaxe : auncune chaine ne peut être vide (" + addedEventKey + ')\n';
                        isValid = false;
                    }
            }
        }
        isValid ? await addEvent(addedEvent).then(res => res.data).catch((error) => {alert(error)}) : alert(errorMessage);

    }

    render() {
        return (
            <div className="container">
                <Form>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id du créateur</Form.Label>
                        <Col sm="4">
                            <Form.Select value={this.state.creatorId} onChange={this.handleChange} id="creatorId" name="creatorId">
                                {this.state.creatorsOptions.map(
                                     item => (<option key={parseInt(item.userid)} value={parseInt(item.userid)}> {`${parseInt(item.userid)} - ${item.firstname} ${item.name}`} </option>)
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Catégorie de jeu</Form.Label>
                        <Col sm="4">
                            <Form.Select value={this.state.gameCategory} onChange={this.handleChange} id="gameCategoryId" name="gameCategoryId">
                                {this.state.categoriesOptions.map(
                                    item => (<option key={parseInt(item.gamecategoryid)} value={parseInt(item.gamecategoryid)}> {`${parseInt(item.gamecategoryid)} - ${item.label} `} </option>)
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de l'événement</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.eventDate} onChange={this.handleChange} id="eventDate" name="eventDate" /></Col>
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


                    <Button as={Link} to={"/events"} onClick={this.submitHandler} variant="primary" >Ajouter l'événement</Button>
                </Form>

            </div>
        );
    }
}
