import React from 'react';
import { graphql } from 'react-apollo';
import { getPersonQuery } from "../queries/queries";

function PersonDetails(props) {
    const displayPersonDetails = () => {
        const { person } = props.data;
        if (person) {
            return(
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">{ person.name }</h1>
                        <br/>
                        <h6 className="card-subtitle">{ person.number }</h6>
                        <br/>
                        <h6 className="card-subtitle">{ person.location.name }</h6>
                        <br/>
                        <p className="card-text">All people in this location:</p>
                        <ul>
                            {
                                person.location.people.map(item => {
                                    return  <li key={ item.id } onClick={(e) => {props.setSelected(item.id)}}>{ item.name }</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div><h1>Select a contact</h1></div>
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