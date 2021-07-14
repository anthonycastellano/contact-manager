import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import People from './components/People';
import Locations from './components/Locations';
import AddPerson from "./components/AddPerson";

const client = new ApolloClient({
   uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <Navigation/>
        <Switch>
          <Route path='/locations' component={Locations}/>
          <Route path='/add' component={AddPerson}/>
          <Route path='/' component={People}/>
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
