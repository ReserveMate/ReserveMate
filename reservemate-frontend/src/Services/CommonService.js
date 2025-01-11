import axios from "axios";

class CommonService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try{
            const response = await axios.post(`${CommonService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isCustomer(){
        const role = localStorage.getItem('role')
        return role === 'CUSTOMER'
    }

    static isRestaurant(){
        const role = localStorage.getItem('role')
        return role === 'RESTAURANT'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default CommonService;