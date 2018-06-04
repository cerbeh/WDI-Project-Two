const express = require('express');
const router = express.Router();

const venueController = require('../controllers/venues');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');

//Remember this line needs to still be made to have the homepage look shiny and something.
router.get('/', (req, res) => res.render('index', {
  venue: 'name'
}));

/*
#####################################
###########Users Page Routes#########
#####################################
*/

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show);


/*
#####################################
###########New User routes###########
#####################################
*/
router.route('/registration')
  .get(registrationsController.new)
  .post(registrationsController.create);

/*
#####################################
#######Venue Navigation routes#######
#####################################
*/
router.route('/venues')
  .get(venueController.index)
  .post(venueController.create);
router.route('/venues/new')
  .get(venueController.new);
router.route('/venues/:id')
  .get(venueController.show)
  .put(venueController.update)
  .delete(venueController.delete);
router.route('/venues/:id/edit')
  .get(venueController.edit);







module.exports = router;
