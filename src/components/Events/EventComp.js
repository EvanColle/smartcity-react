import React, { Component } from 'react'
import { Table} from 'react-bootstrap'
import EventLineComp from './EventLineComp'
import {getEvents} from "../API";


export default class EventComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events : []
        }
    }

    componentDidMount() {
        getEvents().then(result => this.setState({events : result}));
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Créateur</th>
                        <th>Catégorie</th>
                        <th>Date de création</th>
                        <th>Date de l'événement</th>
                        <th>Lieu</th>
                        <th>Description</th>
                        <th>Est vérifié</th>
                        <th>Places max</th>
                        <th>Remarque</th>
                        <th>CRUD</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.state.events.map((event) =>
                                <EventLineComp key={event.eventid}
                                eventId = {event.eventid} creator = {`${event.user.firstname} ${event.user.name} `} eventCategory = {event.gamecategory.label} eventDate={event.eventdate} creationDate = {event.creationdate}
                                place = {`${event.address.street} ${event.address.number}, ${event.address.postalcode} ${event.address.city}`} description = {event.eventdescription} isVerified = {event.isverified} maxSize={event.nbmaxplayer} notice ={event.adminmessage}
                                />) 
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
