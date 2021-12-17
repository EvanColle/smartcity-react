import React from "react"; 
import { Form, Col, Button, Row } from "react-bootstrap";
import {login} from "./API";
class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loaded: false,
            loading: false,
            error: false,
            errorMessage: "",
            connected: false
        };
    }

    dismissError() {
        this.setState({ error: "" });
    }

    async handleSubmit() {
        this.setState({
            error: false,
            errorMessage: "",
            loading: true,
            loaded: false,
        });

        try {
            const data = await login(this.state.username, this.state.password);
            console.log(data);
            this.props.login(data);
            this.setState({connected : true});

        } catch (e) {
            this.setState({
                error: true,
                loading: false,
                loaded: true,
                errorMessage: e
            });
        }
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    render () {
        return (
            <div className="divForm">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Identifiant</Form.Label>
                        <Col sm={3}><Form.Control type="email"  value={this.state.username} onChange={(event) =>
                            this.handleUserChange(event)
                        }  /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Mot de passe</Form.Label>
                        <Col sm={2}><Form.Control type="password" value={this.state.password} onChange={(event) =>
                            this.handlePassChange(event)
                        } /></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 4, offset: 2 }}>
                            <Button onClick={() => {
                                this.dismissError();
                                this.handleSubmit().then();
                            }}>Se connecter</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }

}

export default LoginForm;






