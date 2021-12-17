import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import CategoriesLineComp from './CategoriesLineComp'
import {getCategories} from "../API";


export default class CategoriesComp extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            loadCategories : true
        }
    }
    componentDidMount() {
        getCategories()
            .then(result => this.setState({categories : result}))
            .catch(error => alert(error));
    }
    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loadCategories){
            getCategories()
                .then(result => {
                    if(prevState.category !== result)
                        this.setState({categories : result})
                })
                .catch(error => alert(error));
        }
    }*/

    render() {
        return (
            <div>
               <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>CRUD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((category) => <CategoriesLineComp key={category.gamecategoryid} categoryID={category.gamecategoryid} label={category.label} description={category.description} /> ) }
                    </tbody>
                </Table> 
            </div>
        )
    }
}
