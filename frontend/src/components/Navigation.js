import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';
import React from "react";

// TODO: fixed="top"
function Navigation(props) {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Contact List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Nav.Link href="/">People</Nav.Link>
                    <Nav.Link href="/locations">Locations</Nav.Link>
                    <Nav.Link href="/add">Add Person</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;