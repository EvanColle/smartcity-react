import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {deleteInscription} from "../../Utils/API";

export default class InscriptionLineComp extends Component {

    deleteHandler = event =>  {
        event.preventDefault();
        deleteInscription(this.props.inscriptionId).then(res => res.data).catch((error) => alert(error));
    }

    render() {
        return (
                <tr>
                        <td>{this.props.inscriptionId}</td>
                        <td>{this.props.eventId}</td>
                        <td>{this.props.userId}</td>
                        <td>{this.props.firstName}</td>
                        <td>{this.props.name}</td>
                        <td>{this.props.eventDescription}</td>
                        <td>
                        <Button onClick={this.deleteHandler} variant="danger">X</Button>
                        </td>
                </tr>
        )
    }
}
