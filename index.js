const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs')

// Update the location of the folder for res.render to use
app.set('views', path.join(__dirname, 'src/templates/views'))

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

