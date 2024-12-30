package com.reservemate.ReserveMate_backend.customer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;





public interface CustomerRepository extends  JpaRepository<Customer, Integer> {

	Customer findById(long id);
	Optional<Customer> findByEmail(String email);
	Customer findByRole(String role);
	
}
