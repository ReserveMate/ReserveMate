package com.reservemate.ReserveMate_backend.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CustomerController {
	
	@Autowired
	private CustomerServiceImpl customerServiceImpl;
	

	@PostMapping("/public/signup")
	public ResponseEntity<CustomerSignupDTO> customerSignup(@RequestBody CustomerSignupDTO customersignup) {
		return ResponseEntity.ok(customerServiceImpl.customerSignup(customersignup));
	}

	@PutMapping("/customer/update/{customerId}")
	public ResponseEntity<CustomerSignupDTO> updateCustomer(@PathVariable Integer customerId, @RequestBody Customer reqres) {
		return ResponseEntity.ok(customerServiceImpl.updatedCustomerProfile(customerId, reqres));
	}

	@GetMapping("/customer/profile/info")
	public ResponseEntity<CustomerSignupDTO> getCustomerProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		CustomerSignupDTO response = customerServiceImpl.getCustomerInfo(email);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}


}
