import React, {Component} from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import SearchEventComp from "../components/Events/SearchEventComp";
import EventComp from "../components/Events/EventComp";
import PendingEventComp from "../components/Events/PendingEventComp";
import AddEventComp from "../components/Events/AddEventComp";
import ProfileComp from "../components/Users/ProfileComp";
import SearchUserComp from "../components/Users/SearchUserComp";
import UsersComp from "../components/Users/UsersComp";
import AddUserComp from "../components/Users/AddUserComp";
import LoginForm from "../components/Users/LoginForm";
import SearchInscriptionComp from "../components/Inscritpions/SearchInscriptionComp";
import InscriptionComp from "../components/Inscritpions/InscriptionComp";
import AddInscriptionComp from "../components/Inscritpions/AddInscriptionComp";
import SearchCategoryComp from "../components/Categories/SearchCategoryComp";
import CategoriesComp from "../components/Categories/CategoriesComp";
import AddCategoryComp from "../components/Categories/AddCategoryComp";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default class MyRoutes extends Component{

        render() {

            return (
                <BrowserRouter>
                    <ResponsiveNavbar/>
                    <Routes>
                        <Route path="/" element={<LoginForm/>}/>
                        <Route path="/searchEvent" element={this.props.connectionState ? <SearchEventComp/> : <LoginForm/>}/>
                        <Route path="/events" element={this.props.connectionState ? <EventComp/> : <LoginForm/>}/>
                        <Route path="/pending" element={this.props.connectionState ?<PendingEventComp/>: <LoginForm/>}/>
                        <Route path="/createEvent" element={this.props.connectionState ?<AddEventComp/>: <LoginForm/>}/>
                        <Route path="/myProfile" element={this.props.connectionState ?<ProfileComp/>: <LoginForm/>}/>
                        <Route path="/searchUser" element={this.props.connectionState ?<SearchUserComp/>: <LoginForm/>}/>
                        <Route path="/users" element={this.props.connectionState ?<UsersComp/>: <LoginForm/>}/>
                        <Route path="/createUser" element={this.props.connectionState ?<AddUserComp/>: <LoginForm/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/searchInscription" element={this.props.connectionState ?<SearchInscriptionComp/>: <LoginForm/>}/>
                        <Route path="/inscriptions" element={this.props.connectionState ?<InscriptionComp/>: <LoginForm/>}/>
                        <Route path="/createInscription" element={this.props.connectionState ?<AddInscriptionComp/>: <LoginForm/>}/>
                        <Route path="/searchGameCategory" element={this.props.connectionState ?<SearchCategoryComp/>: <LoginForm/>}/>
                        <Route path="/gameCategories" element={this.props.connectionState ?<CategoriesComp/>: <LoginForm/>}/>
                        <Route path="/createGameCategory" element={this.props.connectionState ?<AddCategoryComp/>: <LoginForm/>}/>
                    </Routes>
                </BrowserRouter>
            );
        }
}

