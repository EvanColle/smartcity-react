import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import {deleteGameCategory} from "../API";
export default class CategoriesLineComp extends Component {

    deleteHandler = event => {
        alert(` L'élément ${this.props.categoryID} du tableau a été supprimé`);
        event.preventDefault();
        deleteGameCategory(this.props.categoryID).then(res =>
            res
        );
    }

    render() {
        return (
            <tr>
                    <td>{this.props.categoryID}</td>
                    <td>{this.props.label}</td>
                    <td>{this.props.description}</td>
                    <td><Button variant="danger" onClick={this.deleteHandler}>X</Button></td>
                </tr>
        )
    }
}
