import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {postGameCategory} from "../../Utils/API";
import {Link} from "react-router-dom";

export default  class AddCategoryComp extends Component {

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

    async submitHandler() {
        if(this.state.label !== "" && this.state.description)
            await postGameCategory(this.state).then(res => res.data).catch((error) => {alert(error)});
        else
            alert("Vous devez remplir tous les champs");
    }

    render() {
        return (
            <div className="container">
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
