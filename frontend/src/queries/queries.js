import { gql } from 'apollo-boost';

const getPeopleQuery = gql`
    {
        people{
            name
            id
        }
    }
`;

const getPersonQuery = gql`
    query($id: ID) {
        person(id: $id) {
            id
            name
            number
            location{
                name
                id
                people{
                    name
                    id
                }
            }
        }
    }
`;

const getLocationsQuery = gql`
    {
        locations{
            name
            id
            people{
                name
            }
        }
    }
`;

const addPersonMutation = gql`
    mutation($name: String!, $number: String!, $locationId: ID!){
        addPerson(name: $name, number: $number, locationId: $locationId) {
            name
            id
        }
    }
`;

const addLocationMutation = gql`
    mutation($name: String!){
        addLocation(name: $name){
            name
            id
        }
    }
`;

export { getPeopleQuery, getLocationsQuery, getPersonQuery, addPersonMutation, addLocationMutation };