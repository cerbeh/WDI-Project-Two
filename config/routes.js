const express = require('express');
const router = express.Router();

const venueController = require('../controllers/venues');

router.get('/', (req, res) => res.render('index', {
  venue: 'name'
}));

router.route('/venues')
  .get(venueController.index);

module.exports = router;
