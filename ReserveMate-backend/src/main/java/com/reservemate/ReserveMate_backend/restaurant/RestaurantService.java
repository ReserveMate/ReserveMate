package com.reservemate.ReserveMate_backend.restaurant;

import java.util.List;

public interface RestaurantService {
	
	RestaurantRegistrationDTO registerRestaurant(RestaurantRegistrationDTO restaurantRegistrationRequest);

	//List<Restaurant> getAllRestaurant();

	//RestaurantRegistrationDTO getAllRestaurants();
	
	//List<RestaurantRegistrationDTO> getAllRestaurantsById(Long id);
	
	RestaurantRegistrationDTO updatedRestaurantProfile(Integer restaurantId, Restaurant updatedRestaurantProfile);

	RestaurantRegistrationDTO getRestaurantInfo(String email);

	List<RestaurantRegistrationDTO> getAllRestaurants();

	Restaurant findById(long id);
}
