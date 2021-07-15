import React from 'react';
import { graphql } from 'react-apollo';
import { getPersonQuery } from "../queries/queries";

//TODO: learn more about map, add click functionality for people in location (use hooks)

function PersonDetails(props) {
    const displayPersonDetails = () => {
        const { person } = props.data;
        if (person) {
            return(
                <div>
                    <h2>{ person.name }</h2>
                    <p>{ person.number }</p>
                    <p>{ person.location.name }</p>
                    <p>All people in this location:</p>
                    <ul>
                        {
                            person.location.people.map(item => {
                               return  <li key={ item.id } onClick={(e) => {props.setSelected(item.id)}}>{ item.name }</li>
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (
                <div>No person selected...</div>
            );
        }
    };

    return (
        <div>
            {displayPersonDetails()}
        </div>
    );
}

export default graphql(getPersonQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.personId
            }
        }
    }
})(PersonDetails);