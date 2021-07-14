const graphql = require('graphql');
const _ = require('lodash');
const Person = require('../models/person');
const Location = require('../models/location');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// let people = [
//     { name: 'Anthony Castellano', number: '7034742493', id: '1', locationId: '1' },
//     { name: 'Liz Fetscher', number: '5714148434', id: '2', locationId: '1' }
// ];
//
// let locations = [
//     { name: 'Leesburg', id: '1' }
// ];

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        number: { type: GraphQLString },
        location: {
            type: LocationType,
            resolve(parent, args) {
                // return _.find(locations, { id: parent.locationId });
                return Location.findById(parent.locationId);
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
                // return _.filter(people, { locationId: parent.id });
                return Person.find({ locationId: parent.id });
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
                // return _.find(people, { id: args.id });
                return Person.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(locations, { id: args.id });
                return Location.findById(args.id);
            }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                // return people;
                return Person.find({});
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args) {
                // return locations;
                return Location.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPerson: {
            type: PersonType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                number: { type: new GraphQLNonNull(GraphQLString) },
                locationId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let person = new Person({
                   name: args.name,
                   number: args.number,
                   locationId: args.locationId
                });
                return person.save();
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let location = new Location({
                    name: args.name
                });
                return location.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});