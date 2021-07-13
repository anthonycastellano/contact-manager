const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

let people = [
    { name: 'Anthony Castellano', number: '7034742493', id: '1', locationId: '1' },
    { name: 'Liz Fetscher', number: '5714148434', id: '2', locationId: '1' }
];

let locations = [
    { name: 'Leesburg', id: '1' }
];

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        number: { type: GraphQLInt },
        location: {
            type: LocationType,
            resolve(parent, args) {
                return _.find(locations, { id: parent.locationId });
            }
        }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return _.filter(people, { locationId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(people, { id: args.id });
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(locations, { id: args.id });
            }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return people;
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args) {
                return locations;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});