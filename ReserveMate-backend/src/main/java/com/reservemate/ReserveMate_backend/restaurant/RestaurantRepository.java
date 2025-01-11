package com.reservemate.ReserveMate_backend.restaurant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends  JpaRepository<Restaurant, Integer> {

	Restaurant findById(long id);
	Optional<Restaurant> findByEmail(String email);
	Restaurant findByRole(String role);
	
}
