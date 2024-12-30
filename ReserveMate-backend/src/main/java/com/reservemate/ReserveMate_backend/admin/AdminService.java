package com.reservemate.ReserveMate_backend.admin;

import com.reservemate.ReserveMate_backend.customer.CustomerSignupDTO;
import com.reservemate.ReserveMate_backend.restaurant.RestaurantRegistrationDTO;

public interface AdminService {
	
	public RestaurantRegistrationDTO getAllRestaurants();
	public CustomerSignupDTO getAllCustomers();
	

}
