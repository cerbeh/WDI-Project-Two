const express        = require('express');
const ejsLayouts     = require('express-ejs-layouts');
// const bodyParser     = require('body-parser');
// const methodOverride = require('method-override');
// const mongoose       = require('mongoose');

const app = express();
const router = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(ejsLayouts);

app.use(express.static(`${__dirname}/public`));

// app.get('/venue', (req, res) => res.render('venues/show', {
//   venue: 'Name',
//   location: 'somewhere',
//   rating: 4.5
// }));

app.use(router);

app.listen(4000, () => console.log('Express is listening on port:4000'));
