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

    static async getToken() {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found in local storage');
            return token;
        } catch (err) {
            throw err;
        }
    }

    static async getAllRestaurants() {
        try {
          const response = await axios.get(`${CommonService.BASE_URL}/public/all`);
          return response.data;
        } catch (err) {
          throw err;
        }
      }

      static async getRestaurantById(restaurantId) {
        try {
          const response = await axios.get(`${CommonService.BASE_URL}/public/${restaurantId}`);
          return response.data;
        } catch (err) {
          throw err;
        }
      }
}

export default CommonService;