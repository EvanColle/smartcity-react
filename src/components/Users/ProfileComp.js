import React, {useEffect, useState} from 'react'
import {Form,Row, Col} from 'react-bootstrap'
import {getUser} from "../../Utils/API";
import {UserStore} from "../../Utils/Store/User";

export default function ProfileComp() {

    const globalUser = UserStore.useState(s => s)
    const [user, setUser] = useState({});

    useEffect( () => {
        getUser(globalUser.data.userid).then(res => setUser(res[0]));
    });

        return (
            <div>
                <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm="2">Nom</Form.Label>
                            <Col sm="10"><Form.Control value={user.name} /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                            <Form.Label column sm="2">Prénom</Form.Label>
                            <Col sm="10"><Form.Control value={user.firstname} /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBirthDate">
                            <Form.Label column sm="2">Date de naissance</Form.Label>
                            <Col sm="10"><Form.Control type="text" value={user.birthdate}  /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10"><Form.Control value={user.email}  /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPassword">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10"><Form.Control value={user.password} /></Col>
                        </Form.Group>
                </Form>
            </div>
        )
}
