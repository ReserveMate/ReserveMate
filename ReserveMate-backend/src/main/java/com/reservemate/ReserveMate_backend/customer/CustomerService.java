package com.reservemate.ReserveMate_backend.customer;

import java.util.List;

public interface CustomerService {
	
	CustomerSignupDTO customerSignup(CustomerSignupDTO customerSignupRequest);

	List<Customer> getAllCustomers();

	Customer findById(long id);

}
