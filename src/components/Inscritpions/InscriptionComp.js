import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import InscriptionLineComp from './InscriptionLineComp'
import {getInscriptions} from "../../Utils/API";

export default class InscriptionComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inscriptions: [],
            loadInscriptions : true,
        }
    }

    componentDidMount() {
        this.mounted = true;
        getInscriptions().then(result => {
            this.setState({inscriptions : result})
        }).catch((error) => alert(error));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loadInscriptions){
            getInscriptions()
                .then(result => {
                    if(prevState.inscription !== result && this.mounted)
                        this.setState({inscriptions : result})
                })
                .catch(error => alert(error));
        }
    }
    componentWillUnmount() {
        this.mounted = false;
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
                        {this.state.inscriptions.map((inscription) => <InscriptionLineComp key={inscription.inscriptionid} inscriptionId={inscription.inscriptionid} eventId={inscription.eventid} userId={inscription.userid} firstName={inscription.firstname} name={inscription.name} eventDescription={inscription.eventdescription} />  )}
                    </tbody>
                </Table>
            </div>
        )
    }
}
