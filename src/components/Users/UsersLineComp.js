import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import {deleteUser} from "../../Utils/API";

export default class UsersLineComp extends Component {

    deleteHandler = event => {
        event.preventDefault();
        deleteUser(this.props.userid).then(res => res).catch((error) => console.log(error));
    }

    render() {
        return (
            <tr>
                <td>{this.props.userid}</td>
                <td>{this.props.firstname}</td>
                <td>{this.props.name}</td>
                <td>{this.props.birthdate.slice(0,10)}</td>
                <td>{this.props.isadmin ? "Oui" : "Non"}</td>
                <td>{this.props.email}</td>
                <td><Button onClick={this.deleteHandler} variant="danger">X</Button> </td>
            </tr>
        )
    }
}
