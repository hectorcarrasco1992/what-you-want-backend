const express = require('express');
const router = express.Router();
const activityController = require('./controllers/activityController');

router.get('/activity', activityController.getActivitiesAPI);
router.post('/get-activities', activityController.getAllActivities);
router.post('/like-activity', activityController.likeActivity);
router.post('/dislike-activity', activityController.dislikeActivity);

module.exports = router;
