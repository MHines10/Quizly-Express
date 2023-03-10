const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const { authenticate } = require('./src/middleware/auth');
const cookieParser = require('cookie-parser');
const { userData } = require('./src/middleware/userData')

// execute the connectDB function to connect to our database
connectDB();

// // Basic Middleware
// // Middleware is a function that takes a request and a response
// const myLogger = function(req, res, next){
//     console.log(req.path);
//     next();
// }

// Basic Middleware
// Middleware is a function that takes a request and a response
const myLogger = function(req, res, next){
    console.log(req.path);
    next();
}

app.use(myLogger);

// add cookie parser middleware BEFORE the authenticate
app.use(cookieParser());

// Add authentication middleware to app
app.use(authenticate);

//Add userData middleware which will add quzzzes to the req.verifiedUser Object
// *Must be after Authenticate
app.use(userData);

// add graphql middleware to app
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.set('view engine', 'ejs')

// Update the location of the folder for res.render to use
app.set('views', path.join(__dirname, 'src/templates/views'))

// setup middleware to parse form data and add to request
app.use(express.urlencoded({ extended: true }));

// import the function from routes module
const initRoutes = require('./src/routes');

// Execute the function with app as argumwnt
initRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

