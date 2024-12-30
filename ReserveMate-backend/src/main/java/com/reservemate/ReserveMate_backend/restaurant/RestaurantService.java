package com.reservemate.ReserveMate_backend.restaurant;

import java.util.List;

public interface RestaurantService {
	
	RestaurantRegistrationDTO registerRestaurant(RestaurantRegistrationDTO restaurantRegistrationRequest);

	List<Restaurant> getAllRestaurant();

	Restaurant findById(long id);
	
	RestaurantRegistrationDTO updatedRestaurantProfile(Integer restaurantId, Restaurant updatedRestaurantProfile);

	RestaurantRegistrationDTO getRestaurantInfo(String email);
}
