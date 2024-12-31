import axios from "axios";

class CustomerService{
    static BASE_URL = "http://localhost:8080"

    static async customerSignup(customerData, token){
        try{
            const response = await axios.post(`${CustomerService.BASE_URL}/public/signup`, customerData, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getCustomerInfo(token){
        try{
            const response = await axios.get(`${CustomerService.BASE_URL}/customer/profile/info`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updatedCustomerProfile(customerId, customerData, token){
        try{
            const response = await axios.put(`${CustomerService.BASE_URL}/customer/update/${customerId}`, customerData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


}

export default CustomerService;