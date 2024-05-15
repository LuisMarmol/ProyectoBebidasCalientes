express = require('express');
const bodyParser = require('body-parser');

const drinksRoutes = require('./routes/drinks-routes');
const HttpError = require('./models/http-error');

const app = express();


app.listen(3000);