package com.reservemate.ReserveMate_backend.customer;

import org.springframework.data.jpa.repository.JpaRepository;



public interface CustomerRepository extends  JpaRepository<Customer, Long> {

	Customer findById(long id);
	Customer findByEmail(String email);
	Customer findByRole(String role);
	
}
