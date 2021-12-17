import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import SearchEventComp from "../components/Events/SearchEventComp";
import EventComp from "../components/Events/EventComp";
import PendingEventComp from "../components/Events/PendingEventComp";
import AddEventComp from "../components/Events/AddEventComp";
import ProfileComp from "../components/Users/ProfileComp";
import SearchUserComp from "../components/Users/SearchUserComp";
import UsersComp from "../components/Users/UsersComp";
import AddUserComp from "../components/Users/AddUserComp";
import LoginForm from "../components/LoginForm";
import SearchInscriptionComp from "../components/Inscritpions/SearchInscriptionComp";
import InscriptionComp from "../components/Inscritpions/InscriptionComp";
import AddInscriptionComp from "../components/Inscritpions/AddInscriptionComp";
import SearchCategoryComp from "../components/Categories/SearchCategoryComp";
import CategoriesComp from "../components/Categories/CategoriesComp";
import AddCategoryComp from "../components/Categories/AddCategoryComp";
import MessageComp from "../components/Messages/MessageComp";

class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/searchEvent" element={<SearchEventComp/>}/>
                <Route path="/events" element={<EventComp/>}/>
                <Route path="/pending" element={<PendingEventComp/>}/>
                <Route path="/createEvent" element={<AddEventComp/>}/>
                <Route path="/myProfile" element={<ProfileComp/>}/>
                <Route path="/searchUser" element={<SearchUserComp/>}/>
                <Route path="/users" element={<UsersComp/>}/>
                <Route path="/createUser" element={<AddUserComp/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/searchInscription" element={<SearchInscriptionComp/>}/>
                <Route path="/inscriptions" element={<InscriptionComp/>}/>
                <Route path="/createInscription" element={<AddInscriptionComp/>}/>
                <Route path="/searchGameCategory" element={<SearchCategoryComp/>}/>
                <Route path="/gameCategories" element={<CategoriesComp/>}/>
                <Route path="/createGameCategory" element={<AddCategoryComp/>}/>
                <Route path="/messages" element={<MessageComp/>}/>
            </Routes>
        );
    }
}

export default MyRoutes;