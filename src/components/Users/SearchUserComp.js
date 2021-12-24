import React, {Component} from 'react';
import {getUser, getUsers, grantUser, updateUser} from "../../Utils/API";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Alert from "bootstrap/js/src/alert";

export default class SearchUserComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId: 1,
            selectOptions : [],
            firstname : "",
            lastname : "",
            birthdate : "",
            isAdmin : true,
            email : "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleModification = this.handleModification.bind(this);
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
    handleSearch(e){
        e.preventDefault();
        getUser(this.state.searchId).then(result => this.setState(
            {
                firstname : result[0].firstname,
                lastname : result[0].name,
                birthdate : result[0].birthdate,
                isAdmin : result[0].isAdmin,
                email : result[0].email,
            })).catch((error) => alert(error));
    }

    componentDidMount() {this.getSelectOptions();}

    getSelectOptions(){getUsers().then( res => this.setState({selectOptions : res })).catch((error) => alert(error));}

    async handleModification(){
        let isValid = true;
        const modifiedUser = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            birthdate : this.state.birthdate,
            email : this.state.email,
        }
        for (const element in modifiedUser ) {
            if(!(modifiedUser[element] !== "" && modifiedUser[element] !== undefined))
                isValid = false;
        }
        isValid ? await updateUser(this.state.searchId, modifiedUser).then(res => res).catch((error) => console.log(error)) : new Alert("Veuillez remplir tous les champs");
        await grantUser(this.state.searchId, {isAdmin : this.state.isAdmin}).then(res => res).catch((error) => alert(error));
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Id du créateur</Form.Label>
                        <Col sm="4">
                            <Form.Select value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId">
                                {this.state.selectOptions.map(
                                    item => (<option key={parseInt(item.userid)} value={parseInt(item.userid)}> {`${parseInt(item.userid)} - ${item.firstname} ${item.name}`} </option>)
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Button onClick={this.handleSearch} variant="primary" >Recherche</Button>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Prénom</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.firstname} onChange={this.handleChange} id="firstname" name="firstname"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Nom</Form.Label>
                        <Col sm="4"><Form.Control value={this.state.lastname} onChange={this.handleChange} id="lastname" name="lastname" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Date de naissance</Form.Label>
                        <Col sm="4"><Form.Control type="text" value={this.state.birthdate.slice(0,10)} onChange={this.handleChange} id="birthdate" name="birthdate" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Est admin</Form.Label>
                        <Col sm="1"><Form.Check checked={this.state.isAdmin} onChange={this.handleChange} id="isAdmin" name="isAdmin" /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="4"><Form.Control type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email" /></Col>
                    </Form.Group>

                    <Button as={Link} to={"/users"}  onClick={this.handleModification} variant="primary" >Modifier l'utilisateur</Button>
                </Form>
            </div>
        );
    }
}
