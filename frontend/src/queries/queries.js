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

export { getPeopleQuery, getLocationsQuery, getPersonQuery };