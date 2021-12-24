import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import CategoriesLineComp from './CategoriesLineComp'
import {getGameCategories} from "../../Utils/API";

export default class CategoriesComp extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            loadCategories : true
        }
    }
    componentDidMount() {
        this.mounted = true;
        getGameCategories()
            .then(result => {
                if(this.mounted)
                    this.setState({categories : result} )
            })
            .catch(error => alert(error));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loadCategories){
            getGameCategories()
                .then(result => {
                    if(prevState.category !== result && this.mounted)
                        this.setState({categories : result})
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
