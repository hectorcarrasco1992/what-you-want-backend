const express = require('express');
const router = express.Router();

router.get('/activity',(req,res)=>{
    res.send("yerrr")
})

module.exports = router