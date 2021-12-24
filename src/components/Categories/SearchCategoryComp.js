import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {getGameCategories, getGameCategory, updateGameCategory} from "../../Utils/API";
import {Link} from "react-router-dom";

export default class SearchCategoryComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId : 1,
            categoriesOptions : [],
            label : "",
            description : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
    }

    componentDidMount() {
        this.getSelectOptions();
    }

    getSelectOptions(){
        getGameCategories().then(res => this.setState({categoriesOptions : res })).catch((error) => alert(error));
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
        getGameCategory(this.state.searchId).then(result => this.setState(
            {
                label : result[0].label,
                description : result[0].description,
            })).catch((error) => alert(error));

    }

    async handleModification(){
        const modifiedCategory = {"label" : this.state.label, "description" : this.state.description};
        this.state.label !== "" & this.state.description !== "" ? await updateGameCategory(this.state.searchId,modifiedCategory).then(res => res).catch((error) => alert(error)) : alert("Vous devez remplir tous les champs");
    }

    render() {
        return (
            <div className="container-fluid">
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Catégories de jeu</Form.Label>
                        <Col sm="4">
                            <Form.Select value={this.state.searchId} onChange={this.handleChange} id="searchId" name="searchId">
                                {this.state.categoriesOptions.map(
                                    item => (<option key={parseInt(item.gamecategoryid)} value={parseInt(item.gamecategoryid)}> {`${parseInt(item.gamecategoryid)} - ${item.label} `} </option>)
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Button onClick={this.handleSearch} variant="primary" >Recherche</Button>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2" >Label</Form.Label>
                            <Col sm="10"><Form.Control value={this.state.label} onChange={this.handleChange} id="label" name="label"/></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10"><Form.Control  value={this.state.description} onChange={this.handleChange} id="description" name="description" /></Col>
                        </Form.Group>

                        <Button as={Link} to={"/gameCategories"} onClick={this.handleModification} variant="primary" >Modifier la catégorie</Button>
                </Form>
            </div>
        );
    }
}

