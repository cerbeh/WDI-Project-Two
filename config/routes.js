const express = require('express');
const router = express.Router();

const venueController = require('../controllers/venues');

router.get('/', (req, res) => res.render('index', {
  venue: 'name'
}));

router.route('/venues')
  .get(venueController.index)
  .post(venueController.create);

router.route('/venues/new')
  .get(venueController.new);

router.route('/venues/:id')
  .get(venueController.show)
  .put(venueController.update);

router.route('/venues/:id/edit')
  .get(venueController.edit);

module.exports = router;
