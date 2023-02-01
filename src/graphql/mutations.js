const { GraphQLString } = require('graphql');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../util/auth');


const register = {
    type: GraphQLString,
    description: 'Register a new user',
    args: {
        username: {type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        const checkUser = await User.findOne({email: args.email })
        if (checkUser){
            throw new Error("User with this email already exists")
        }

        const { username, email, password } = args;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: passwordHash });

        await user.save();

        const token = createJwtToken(user);

        return token;
    }
}

const login = {
    type: GraphQLString,
    description: 'Login User',
    args: {
        username: {type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        // Get user from database on the email
        const user = await User.findOne({email: args.email })
        // get the hashed password from user or set to an empty string if no user
        const hashedPassword = user?.password || ""
        // returns bool if the passwords match
        const correctPassword = await bcrypt.compare(args.password, user?.password || '');
        // if no user or bad passeord
        if (!user || !correctPassword){
            throw new Error("Invalid Credentials")
        }
        // credential our user via token
        const token = createJwtToken(user);
        return token
    }
}

module.exports = {
    register,
    login
}