import React from "react"; 
import { Form, Col, Button, Row } from "react-bootstrap";
import {login} from "../../Utils/API";
import {Link} from "react-router-dom";
import {UserStore} from "../../Utils/Store/User"

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {this.mounted = true;}
    componentWillUnmount() {this.mounted = false;}

    async handleSubmit() {
        const data = await login(this.state.username, this.state.password).then(res => res).catch((error) => alert(error));
        UserStore.update( s => {
            if(data !== undefined){
                s.auth = true;
                s.data = data.value;
            }
        });
        alert("Connexion réussie")
    }

    handleChange(e){
        const name = e.target.name;
        this.setState({
                [name] : e.target.value,
            }
        )
    }

    render () {
        return (
            <div className="container" >
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Identifiant</Form.Label>
                        <Col sm={3}><Form.Control type="email" controlid="username" name="username" value={this.state.username} onChange={this.handleChange}/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Mot de passe</Form.Label>
                        <Col sm={2}><Form.Control type="password" controlid="password" name="password" value={this.state.password} onChange={this.handleChange}/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 4, offset: 2 }}>
                            <Button as={Link} to={"/gameCategories"} onClick={() => {
                                this.handleSubmit().then(r => r).catch((error) => alert(error));
                            }}>Se connecter</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}








