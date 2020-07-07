const express = require('express');
const router = express.Router();
const activityController = require('./controllers/activityController');

router.get('/activity', activityController.getActivitiesAPI);
router.post('/get-activities', activityController.getAllActivities);

module.exports = router;
