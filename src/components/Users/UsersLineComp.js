import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import {deleteUser} from "../API";



export default class UsersLineComp extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id : ''
        }
    }

    deleteHandler = event => {
        alert(` L'élément ${this.props.userid} du tableau a été supprimé`);
        event.preventDefault();
        deleteUser(this.props.userid).then(res =>
            console.log(res.data)
        );
    }

    render() {
        return (

            <tr>
                <td>{this.props.userid}</td>
                <td>{this.props.name}</td>
                <td>{this.props.firstname}</td>
                <td>{this.props.birthdate.slice(0,10)}</td>
                <td>{this.props.isadmin ? "Oui" : "Non"}</td>
                <td>{this.props.email}</td>
                <td><Button onClick={this.deleteHandler} variant="danger">X</Button> </td>
            </tr>
        )
    }
}
