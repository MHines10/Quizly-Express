const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
// const { buildSchema } = require('graphql');

// execute the connectDB function to connect to our database
connectDB();

// add graphql middleware to app
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.set('view engine', 'ejs')

// Update the location of the folder for res.render to use
app.set('views', path.join(__dirname, 'src/templates/views'))

// setup middleware to parse form data and add to request
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

// impor tthe function from routes module
const initRoutes = require('./src/routes');

// Execute the function with app as argumwnt
initRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

