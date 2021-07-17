import React from 'react';
import { graphql } from 'react-apollo';
import PersonDetails from "./PersonDetails";
import { getPeopleQuery } from "../queries/queries";

function People(props) {
    const [selected, setSelected] = React.useState(null);

    const displayPeople = () => {
      let data = props.data;
      console.log(data.people);
      if(data.loading) {
          return (
              <div>
                  Loading people...
              </div>
          );
      } else {
          return data.people.map(person => {
              if (person.id === selected) {
                  return (
                      <li className="list-group-item list-group-item-action active" key={ person.id } onClick={ (e) => {setSelected(person.id)}}>{ person.name }</li>
                  );
              } else {
                  return (
                      <li className="list-group-item list-group-item-action list-group-item-dark" key={ person.id } onClick={ (e) => {setSelected(person.id)}}>{ person.name }</li>
                  );
              }
          });
      }
    };

    return (
      <div className="container">
          <div className="row">
              <div className="col-4 mt-5 mx-4">
                  <ul className="list-group">
                      { displayPeople() }
                  </ul>
              </div>
              <div className="col mt-5 mx-4">
                  <PersonDetails personId={ selected } setSelected={setSelected}/>
              </div>
          </div>
      </div>
    );
}

export default graphql(getPeopleQuery)(People);