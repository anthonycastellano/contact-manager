import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';

const client = new ApolloClient({
   uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
          <Navbar bg="dark" variant="dark" >
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
      </div>
    </ApolloProvider>
  );
}

export default App;
