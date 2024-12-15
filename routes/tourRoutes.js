const express = require('express');
const tourController = require('../controllers/tourController');

//ROUTE HANDLING
const router = express.Router();

// router.param('id',tourController.checkId);
// const x=1;
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getSpecificTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

//EXPORTING
module.exports = router;
