import React from 'react';
import { addPersonMutation, getLocationsQuery, getPeopleQuery, addLocationMutation } from "../queries/queries";
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

function AddPerson(props) {
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [location, setLocation] = React.useState('');

    const getLocationId = () => {
        return new Promise((resolve, reject) => {
            let locationName = location.substring(0,1).toUpperCase() + location.substring(1, location.length).toLowerCase();
            let locations = props.getLocationsQuery.locations;
            // check if location exists
            for (let i = 0; i < locations.length; i++) {
                if (locations[i].name === locationName) {
                    console.log('found')
                    resolve(locations[i].id);
                    return;
                }
            }
            // create location
            props.addLocationMutation({
                variables: {
                    name: locationName
                },
                refetchQueries: [{ query: getLocationsQuery }]
            }).then((data) => {
                console.log('location id:', data.data.addLocation.id)
                resolve(data.data.addLocation.id);
                return;
            });
        });
    }

    const submit = async (e) => {
        e.preventDefault();
        const locationId = await getLocationId();
        props.addPersonMutation({
            variables: {
                name,
                number,
                locationId
            },
            refetchQueries: [{ query: getPeopleQuery }]
        });
    };

    const clearFields = () => {
      document.getElementById('add-person-form').reset();
    };

    // TODO: don't allow empty name input

    return (
        <div className="container">
            <form className="form-group" id="add-person-form" onSubmit={(e) => {
                submit(e);
                clearFields();
                document.getElementById('label').innerHTML = 'Contact added!';
                setTimeout(() => {
                    document.getElementById('label').innerHTML = 'Add a new contact'
                }, 3000);
            }}>
                <div className="field">
                    <label className="text-primary">Name</label>
                    <input className="form-control" type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <br/>
                <div className="field">
                    <label className="text-primary">Number</label>
                    <input className="form-control" type="text" onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <br/>
                <div className="field">
                    <label className="text-primary">Location</label>
                    <input className="form-control" type="text" onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <br/>
                <div className="row mt-3">
                    <button id="label" className='btn btn-primary'>Add contact</button>
                </div>
            </form>
        </div>
    );
}

export default compose(
    graphql(getLocationsQuery, { name: "getLocationsQuery" }),
    graphql(addPersonMutation, { name: "addPersonMutation" }),
    graphql(addLocationMutation, { name: "addLocationMutation" })
)(AddPerson);