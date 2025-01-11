import axios from "axios";

class AdminService{
    static BASE_URL = "http://localhost:8080"

   

    static async getAllCustomers(token){
        try{
            const response = await axios.get(`${AdminService.BASE_URL}/admin/get-all-customers`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllRestaurants(token){
        try{
            const response = await axios.get(`${AdminService.BASE_URL}/admin/get-all-restaurants`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }



   


    
}

export default AdminService;