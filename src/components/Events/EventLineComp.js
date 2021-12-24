import React, { Component } from 'react'
import {Button} from "react-bootstrap"
import {deleteEvent} from "../../Utils/API";

export default class EventLineComp extends Component {

    deleteHandler = event => {
        event.preventDefault();
        deleteEvent(this.props.eventId).then(res =>res.data).catch((error) => alert(error));
    }

    render() {
        return (
            <tr>
                <td>{this.props.eventId}</td>
                <td>{this.props.creator}</td>
                <td>{this.props.eventCategory}</td>
                <td>{this.props.creationDate.slice(0,10)}</td>
                <td>{this.props.eventDate.slice(0,10)}</td>
                <td>{this.props.place}</td>
                <td>{this.props.description}</td>
                <td>{this.props.isVerified ? "Oui" : "Non"}</td>
                <td>{this.props.maxSize}</td>
                <td>{this.props.notice}</td>
                <td><Button variant="danger" onClick={this.deleteHandler}>X</Button></td>
            </tr>
        )
    }
}
