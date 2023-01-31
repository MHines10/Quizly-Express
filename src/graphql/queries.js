// import types from graphql
const { GraphQLList } = require('graphql');

// Import  our own created type
const { UserType } = require('./types');

// Import model so we can get data from mongoDB
const { User } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    descrption: 'Get all users from the db',
    resolve(parents, args){
        return User.find()
    }
}

module.exports = {
    users
}