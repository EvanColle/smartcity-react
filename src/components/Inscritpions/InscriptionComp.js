import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import InscriptionLineComp from './InscriptionLineComp'
import {getInscriptions} from "../API";


export default class InscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inscriptions: []
        }
    }

    componentDidMount() {
        getInscriptions().then(result => this.setState({inscriptions : result}));
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID de l'événement</th>
                            <th>ID de l'inscrit</th>
                            <th>Prénom de l'inscrit</th>
                            <th>Nom de l'inscrit</th>
                            <th>Description de l'événement</th>
                            <th>CRUD</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.inscriptions.map((inscription) => <InscriptionLineComp inscriptionId={inscription.inscriptionid} eventId={inscription.eventid} userId={inscription.userid} firstName={inscription.firstname} name={inscription.name} eventDescription={inscription.eventdescription} />  )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}
