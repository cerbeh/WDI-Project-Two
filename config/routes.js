const express = require('express');
const router = express.Router();

const venueController = require('../controllers/venues');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');
const sessionsController = require('../controllers/sessions');
const eventController = require('../controllers/events');

//Remember this line needs to still be made to have the homepage look shiny and something.
router.get('/', (req, res) => res.render('index', {
  isHomepage: true
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
  .put(usersController.update)
  .delete(usersController.delete);

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

router.route('/events')
  .get(eventController.index)
  .post(eventController.create);

router.route('/events/new')
  .get(eventController.new);

router.route('/events/:id')
  .get(eventController.show)
  //.put(eventController.update)
  .delete(eventController.delete);

// router.route('/events/:id/edit')
//  .get(eventController.edit);

router.route('/events/:id/comments')
  .post(eventController.createComment);

router.route('events/:id/comments/:commentId')
  .delete(eventController.deleteComment);

router.route('/events/:id/attending')
  .post(eventController.attend);



module.exports = router;
