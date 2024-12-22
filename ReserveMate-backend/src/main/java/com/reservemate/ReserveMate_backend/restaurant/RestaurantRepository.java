package com.reservemate.ReserveMate_backend.restaurant;

import org.springframework.data.jpa.repository.JpaRepository;



public interface RestaurantRepository extends  JpaRepository<Restaurant, Long> {

	Restaurant findById(long id);
	Restaurant findByEmail(String email);
	Restaurant findByRole(String role);
	
}
