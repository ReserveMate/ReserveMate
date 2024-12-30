package com.reservemate.ReserveMate_backend.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reservemate.ReserveMate_backend.restaurant.RestaurantRegistrationDTO;
import com.reservemate.ReserveMate_backend.customer.CustomerSignupDTO;



@RestController
public class AdminController {

	@Autowired
	private AdminServiceImpl adminServiceImpl;
	
	
	@GetMapping("/admin/get-all-restaurants")
	public ResponseEntity<RestaurantRegistrationDTO> getAllRestaurants() {
		return ResponseEntity.ok(adminServiceImpl.getAllRestaurants());

	}
	
	@GetMapping("/admin/get-all-customers")
	public ResponseEntity<CustomerSignupDTO> getAllCustomers() {
		return ResponseEntity.ok(adminServiceImpl.getAllCustomers());

	}
	

}
