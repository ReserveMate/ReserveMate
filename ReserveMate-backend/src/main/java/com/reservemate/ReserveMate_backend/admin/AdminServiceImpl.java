package com.reservemate.ReserveMate_backend.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.customer.Customer;
import com.reservemate.ReserveMate_backend.customer.CustomerRepository;
import com.reservemate.ReserveMate_backend.customer.CustomerSignupDTO;
import com.reservemate.ReserveMate_backend.restaurant.Restaurant;
import com.reservemate.ReserveMate_backend.restaurant.RestaurantRegistrationDTO;
import com.reservemate.ReserveMate_backend.restaurant.RestaurantRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	RestaurantRepository restaurantRepository;
	
	@Autowired
	CustomerRepository customerRepository;
	
	 public RestaurantRegistrationDTO getAllRestaurants() {
		 RestaurantRegistrationDTO reqRes = new RestaurantRegistrationDTO();

	        try {
	            List<Restaurant> result = restaurantRepository.findAll();
	            if (!result.isEmpty()) {
	                //reqRes.setUserList(result);
	                reqRes.setStatusCode(200);
	                reqRes.setMessage("Successful");
	            } else {
	                reqRes.setStatusCode(404);
	                reqRes.setMessage("No users found");
	            }
	            return reqRes;
	        } catch (Exception e) {
	            reqRes.setStatusCode(500);
	            reqRes.setMessage("Error occurred: " + e.getMessage());
	            return reqRes;
	        }
	    }
	 
	 public CustomerSignupDTO getAllCustomers() {
		 CustomerSignupDTO reqRes = new CustomerSignupDTO();

	        try {
	            List<Customer> result = customerRepository.findAll();
	            if (!result.isEmpty()) {
	                //reqRes.setUserList(result);
	                reqRes.setStatusCode(200);
	                reqRes.setMessage("Successful");
	            } else {
	                reqRes.setStatusCode(404);
	                reqRes.setMessage("No users found");
	            }
	            return reqRes;
	        } catch (Exception e) {
	            reqRes.setStatusCode(500);
	            reqRes.setMessage("Error occurred: " + e.getMessage());
	            return reqRes;
	        }
	    }

}
