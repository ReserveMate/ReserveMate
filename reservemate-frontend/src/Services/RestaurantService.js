import axios from "axios";

class RestaurantService{
    static BASE_URL = "http://localhost:8080"

    static async registerRestaurant(restaurantData, token){
        try{
            const response = await axios.post(`${RestaurantService.BASE_URL}/public/register`, restaurantData, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getRestaurantInfo(token){
        try{
            const response = await axios.get(`${RestaurantService.BASE_URL}/restaurant/profile/info`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updatedRestaurantProfile(restaurantId, restaurantData, token){
        try{
            const response = await axios.put(`${RestaurantService.BASE_URL}/restaurant/update/${restaurantId}`, restaurantData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


}

export default RestaurantService;