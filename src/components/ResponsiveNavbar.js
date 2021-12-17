//import './App.css';
import React from 'react';
import {Navbar,NavDropdown,Nav, Container  } from "react-bootstrap"
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import MyRoutes from "../routes/MyRoutes";

function ResponsiveNavbar(){
    return (
        <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Smart city</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Evénement" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/searchEvent"}>Recherche</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/events"}>Tous les événements</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/pending"}>En attente</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/createEvent"}>Créer un événement</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Utilisateurs" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/searchUser"}>Recherche</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/users"}>Tous les utilisateurs</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/createUser"}>Créer un utilisateur</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Inscriptions" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/searchInscription"}>Recherche</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/inscriptions"}>Toutes les inscriptions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/createInscription"}>Créer une inscription</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Catégories" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/searchGameCategory"}>Recherche</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/gameCategories"}>Toutes les catégories</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/createGameCategory"}>Créer une catégorie</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to={"/messages"}>Messages</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Profil" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/myProfile"}>Mon profil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={"/login"}>Connexion</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div>
            <MyRoutes/>
        </div>
        </Router>
    );
}
export default ResponsiveNavbar;