import React, { Component } from 'react'
import {Table, Button} from 'react-bootstrap'
export default class MessageComp extends Component {
    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>ID de l'utilisateur</th>
                        <th>ID de l'événement</th>
                        <th>Date d'envoi</th>
                        <th>Contenu</th>
                        <th>CRUD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>53</td>
                        <td>1</td>
                        <td>12/12/2012</td>
                        <td>Blablablabli</td>
                        <td>
                        <Button variant="danger">X</Button> <Button variant="primary">Modifs</Button>{' '}
                        </td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>12</td>
                        <td>2</td>
                        <td>12/12/2012</td>
                        <td>Blablabla</td>
                        <td>
                        <Button variant="danger">X</Button> <Button variant="primary">Modifs</Button>{' '}
                        </td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>5</td>
                        <td>3</td>
                        <td>12/12/2012</td>
                        <td>Blablabla</td>
                        <td>
                        <Button variant="danger">X</Button> <Button variant="primary">Modifs</Button>{' '}
                        </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
