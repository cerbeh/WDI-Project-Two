const express = require('express');
//const ejsLayouts = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//app.use(ejsLayouts);

app.get('/', (req, res) => res.render('index'));



app.listen(4000, () => console.log('Express is listening on port:4000'));
