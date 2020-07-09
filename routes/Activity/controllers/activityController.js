const axios = require('axios');
const User = require('../../user/model/User');
const Activity = require('../model/Activity');
let config = { headers: { 'user-key': process.env.ZOMATO_KEY } };

module.exports = {
    getActivitiesAPI: async (req, res) => {
        let openCageKey = process.env.OPEN_CAGE_KEY;
        let place = 'Brooklyn, Ny 11211';
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${openCageKey}`;
        try {
            let success = await axios.get(url);
            let lat = success.data.results['0'].geometry.lat;
            let long = success.data.results['0'].geometry.lng;
            
            let zomatoUrl = `https://developers.zomato.com/api/v2.1/search?count=10&lat=${lat}&lon=${long}
            `;

            let activity = await axios.get(zomatoUrl, config);
            //console.log(activity.data.restaurants[0].restaurant.id);

            
            let info = activity.data.restaurants.map(async(a) => {
                let isDataBase = false
                //console.log("^^^^^",a.restaurant.id);
                
                //console.log("*****",found.length);
                
            let found =   await Activity.find({apiID:a.restaurant.id})

                // console.log("$$$$$$$",found);

                
            if (found.length == 0 ){
                let stuffToDo = new Activity({
                    name:a.restaurant.name,
                    cuisines:a.restaurant.cuisines,
                    cost:a.restaurant.price_range,
                    location:a.restaurant.location,
                    thumb:a.restaurant.thumb,
                    apiID:a.restaurant.id
                })
                    //console.log("######",stuffToDo);
                    
                    stuffToDo.save()
                }
                //console.log(a);
                
            let newInfo =  {
                name: a.restaurant.name,
                price_range: a.restaurant.price_range,
                location: a.restaurant.location,
                thumb: a.restaurant.thumb,
                cuisines: a.restaurant.cuisines,
                id: a.restaurant.id,
                isDataBase:isDataBase
                }
                return newInfo
                
            }) 
            
            //console.log("///////",info);
            
            Promise.all(info).then((completed)=>res.send(completed));
        } catch (error) {
            console.log(error);
        }
    },

    getAllActivities: async (req, res) => {
        try {
            let success = await Activity.find({});
            //console.log(success);

            res.send(success);
        } catch (error) {
            console.log(error);
        }
    },

    likeActivity:async (req,res)=>{
        try {
            let activity = await Activity.findOne({apiID:req.body.id})
            
            console.log(req.body);
            //console.log(req.body.username);
            
            console.log("test");
            
            let user = await User.findOne({username:req.body.user.username})
            
            user.likes.push(activity)
            user.save()
            res.send(activity)
            console.log(user);
        } catch (error) {
            console.log(error);
            
        }
    },
    dislikeActivity:async (req,res)=>{
        try {
            let activity = await Activity.findOne({apiID:req.body.id})
            
            console.log(req.body);
            //console.log(req.body.username);
            
            //console.log("test");
            
            let user = await User.findOne({username:req.body.user.username})
            
            user.dislikes.push(activity)
            user.save()
            res.send(activity)
            console.log(user);
        } catch (error) {
            console.log(error);
            
        }
    }
};
