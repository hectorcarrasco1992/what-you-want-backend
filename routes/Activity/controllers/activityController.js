const axios = require("axios")
const User = require("../../user/model/User")
let config = { headers: {'user-key': process.env.ZOMATO_KEY} }

// async function getAllRestaurantInfo(dataArray){
//     let data = []
//     dataArray.map(async (a)=>{
//         try {
//                  // console.log(a.establishment);
//         let restInfo =await  axios.get(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${a.establishment.id}&entity_type=${a.establishment.name}`,config)
//         console.log(restInfo)
//         } catch (error) {
//             console.log(error);
            
//         }
        

//     })
// }
module.exports ={
    getActivities:async (req,res)=>{
        let openCageKey = process.env.OPEN_CAGE_KEY 
        let place = "Brooklyn, Ny 11211"
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${openCageKey}`
        try {
            let success = await axios.get(url)
            let lat = success.data.results["0"].geometry.lat
            let long =success.data.results["0"].geometry.lng
            //console.log(success.data.results["0"].geometry.lat);
            let zomatoUrl = `https://developers.zomato.com/api/v2.1/search?count=5&lat=${lat}&lon=${long}
            `
            
            
            let activity = await axios.get(zomatoUrl,config
            )
            let info =activity.data.restaurants.map((a)=>{
                let {name,price_range,location,thumb}= a.restaurant
                return {name,price_range,location,thumb}
            });
            
            
            res.send(info)
        } catch (error) {
            console.log(error);
            
        }
    }
}