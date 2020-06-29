const axios = require("axios")
const User = require("../../user/model/User")

module.exports ={
    getActivities:async (req,res)=>{
        let openCageKey = process.env.OPEN_CAGE_KEY 
        let place = "Brooklyn, Ny 11211"
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${openCageKey}`
        try {
            let success = await axios.get(url)
            res.send(success.data)
        } catch (error) {
            console.log(error);
            
        }
    }
}