const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Express Setup

const app = express();
const PORT = process.env.PORT || 3000;

// Express json parser

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/app/public')));

// App routes

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Server setup

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});