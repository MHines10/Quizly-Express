// import types from graphql
const { GraphQLList, GraphQLID } = require('graphql');

// Import  our own created type
const { UserType } = require('./types');

// Import model so we can get data from mongoDB
const { User } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    description: 'Get all users from the db',
    resolve(parent, args){
        return User.find()
    }
}

const user = {
    type: UserType,
    description: 'Query single user from db by ID',
    args: {
        id: {type: GraphQLID}
    },
    resolve(parent, args){
        return User.findById(args.id)
    }
}

module.exports = {
    users,
    user
}