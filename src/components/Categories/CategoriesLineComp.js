import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import {deleteGameCategory} from "../../Utils/API";

export default class CategoriesLineComp extends Component {

    deleteHandler = event => {
        event.preventDefault();
        deleteGameCategory(this.props.categoryID).then(res => res).catch((error) => {alert(error)});
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
