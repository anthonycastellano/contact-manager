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
             return (
               <li key={ person.id } onClick={ (e) => {setSelected(person.id)}}>{ person.name }</li>
             );
          });
      }
    };

    return (
      <div>
          <ul>
              { displayPeople() }
          </ul>
          <PersonDetails personId={ selected }/>
      </div>
    );
}

export default graphql(getPeopleQuery)(People);