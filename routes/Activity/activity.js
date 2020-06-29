const express = require('express');
const router = express.Router();
const activityController = require("./controllers/activityController")

router.get('/activity',activityController.getActivities)

module.exports = router