import { graphql } from 'react-apollo';
import { getLocationsQuery } from "../queries/queries";
import React from "react";

//TODO: add click functionality for people in location (use hooks)

function Locations(props) {
    const displayData = () => {
        let data = props.data;
        if(data.loading) {
            return (
                <div>
                    Loading locations...
                </div>
            );
        } else {
            return data.locations.map(location => {
                return (
                    <li key={ location.id }>
                        <h1>{ location.name }</h1>
                        <ul>
                            {location.people.map(person => {
                                return(
                                    <li>
                                        <p>{ person.name }</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            });
        }
    };
    return (
        <div>
            <ul>
                {displayData()}
            </ul>
        </div>
    );
}

export default graphql(getLocationsQuery)(Locations);