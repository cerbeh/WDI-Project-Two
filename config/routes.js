const express = require('express');
const router = express.Router();

const venueController = require('../controllers/venues');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');
const sessionsController = require('../controllers/sessions');

//Remember this line needs to still be made to have the homepage look shiny and something.
router.get('/', (req, res) => res.render('index', {
  venue: 'name'
}));

/*
#####################################
#######Users Log in/out Routes#######
#####################################
*/

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

/*
#####################################
##########Users Page Routes##########
#####################################
*/

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update);

router.route('/users/:id/edit')
  .get(usersController.edit);

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
router.route('/venues/:id/comments')
  .post(venueController.createComment);
router.route('venues/:id/comments/:commentId')
  .delete(venueController.deleteComment);

/*
#####################################
##########Event Page Routes##########
#####################################
*/






module.exports = router;
