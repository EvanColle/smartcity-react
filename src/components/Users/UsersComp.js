import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import UsersLineComp from './UsersLineComp'
import {getUsers} from "../../Utils/API";

export default class UsersComp extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [],loadUsers : true}
    }

    componentDidMount() {
        this.mounted = true;
        getUsers().then(result => {
            if(this.mounted)
                this.setState({users : result})
        }).catch(error => alert(error));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loadUsers){
            getUsers()
                .then(result => {
                    if(prevState.user !== result && this.mounted)
                        this.setState({users : result})
                })
                .catch(error => alert(error));
        }
    }

    componentWillUnmount() {this.mounted = false;}

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Date de naissance</th>
                        <th>Est admin</th>
                        <th>Email</th>
                        <th>X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => <UsersLineComp key={user.userid} userid= {user.userid} name = {user.name} firstname = {user.firstname} birthdate = {user.birthdate} isadmin = {user.isadmin} email = {user.email}  />)}
                    </tbody>
                    </Table>
            </div>
        )
    }
}
