const express = require('express');
const { init } = require('express/lib/application');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('register', {username: 'MontiH'});
});

// impor tthe function from routes module
const initRoutes = require('./src/routes');
// Execute the function with app as argumwnt
initRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

