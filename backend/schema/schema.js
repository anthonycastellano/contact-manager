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

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        number: { type: GraphQLString },
        location: {
            type: LocationType,
            resolve(parent, args) {
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
                return Person.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
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