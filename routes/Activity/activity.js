const express = require('express');
const router = express.Router();
const activityController = require("./controllers/activityController")

router.get('/activity',activityController.getActivitiesAPI)
router.get('/get-activities',activityController.getAllActivities)

module.exports = router