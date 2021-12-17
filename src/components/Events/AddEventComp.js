import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {getCategories, getUsers} from "../API";

class AddEventComp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            creatorsOptions : [],
            categoriesOptions : [],
            creatorId : "",
            gameCategory : "",
            eventDate : "",
            street : "",
            number : "",
            country : "",
            city : "",
            postalCode : "",
            eventDescription : "",
            isVerified : false,
            nbMaxPlayer : "",
            adminMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
    }

    getSelectOptions(){
         getUsers().then( res => this.setState({creatorsOptions : res}));
         getCategories().then( res => this.setState({categoriesOptions : res }));
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

    submitHandler(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        console.log(this.state.creatorsOptions);
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
                            <Form.Select value={this.state.gameCategory} onChange={this.handleChange} id="gameCategory" name="gameCategory">
                                {this.state.categoriesOptions.map(
                                    item => (<option key={parseInt(item.gamecategoryid)} value={parseInt(item.gamecategoryid)}> {`${parseInt(item.gamecategoryid)} - ${item.label} `} </option>)
                                )}
                            </Form.Select>
                        </Col>
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

                    <Button onClick={this.submitHandler} variant="primary" >Ajouter l'événement</Button>
                </Form>

            </div>
        );
    }
}

export default AddEventComp;