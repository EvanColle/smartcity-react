import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {postGameCategory} from "../API";
import {Link} from "react-router-dom";

class AddCategoryComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label : "",
            description : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    handleChange(e){
        const name = e.target.name;
        this.setState({
                [name] : e.target.value,
            }
        )
    }
    // TO DO : faire appel à la méthode d'ajout : demander à Augustin
     async submitHandler() {
        await postGameCategory(this.state);

    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2" >Label</Form.Label>
                        <Col sm="10"><Form.Control value={this.state.label} onChange={this.handleChange} id="label" name="label"/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Description</Form.Label>
                        <Col sm="10"><Form.Control value={this.state.description} onChange={this.handleChange} id="description" name="description" /></Col>
                    </Form.Group>

                    <Button as={Link} to={"/gameCategories"} onClick={this.submitHandler} variant="primary" >Ajouter la catégorie</Button>
                </Form>

            </div>
        );
    }
}

export default AddCategoryComp;