const express        = require('express');
const ejsLayouts     = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');
const session        = require('express-session');

const databaseURI ='mongodb://localhost/WDI-Project-Two';

mongoose.connect(databaseURI);

const app = express();
const router = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(ejsLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);

app.listen(4000, () => console.log('Express is listening on port:4000'));
