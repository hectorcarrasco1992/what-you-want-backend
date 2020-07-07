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
            //console.log(success.data.results["0"].geometry.lat);
            let zomatoUrl = `https://developers.zomato.com/api/v2.1/search?count=20&lat=${lat}&lon=${long}
            `;

            let activity = await axios.get(zomatoUrl, config);
            console.log(activity.data.restaurants[0].restaurant.id);

            let info =[]
            info = activity.data.restaurants.map((a) => {
                let isDataBase = false
                if(Activity.findOne({apiID:a.id}===true )){
                    isDataBase = true
                    console.log("isDAtaBAse");
                }
                
                console.log("........",Activity.findOne({apiID:a.id}))
                let newInfo = {
                    name:a.restaurant.name,
                    price_range:a.restaurant.price_range,
                    location:a.restaurant.location,
                    thumb:a.restaurant.thumb,
                    cuisines:a.restaurant.cuisines,
                    id:a.restaurant.id,
                    isDataBase:isDataBase

                }
                    // let {
                    //     name,
                    //     price_range,
                    //     location,
                    //     thumb,
                    //     cuisines,
                    //     id
                    // } = a.restaurant;
                    
                    return newInfo;
                
            }) 

            console.log(info);
            
            info.map((a)=>{
                if(a.isDataBase) {
                    return
                }
                    let stuffToDo = new Activity({
                        name:a.name,
                        cuisines:a.cuisines,
                        cost:a.price_range,
                        location:a.location,
                        thumb:a.thumb,
                        apiID:a.id
                    })
                    console.log("stuffToDo");
                    
                    stuffToDo.save()
                })
    
            ;
        


            //console.log(info);

            res.send(info);
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

    likeActivity:async(req,res)=>{
        try {
            // let success = Activity.findOne({_id:req.body._id})
            // console.log(".......",success);
            //console.log(req.body);
            console.log(req.body.username);
            
            console.log("test");
            
            // let user = User.findOne({username:req.body.username})
            // user.likes.push(success)
        } catch (error) {
            console.log(error);
            
        }
    }
};
