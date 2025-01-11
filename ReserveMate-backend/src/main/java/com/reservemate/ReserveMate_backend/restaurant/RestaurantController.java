package com.reservemate.ReserveMate_backend.restaurant;

import java.util.List;

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
public class RestaurantController {

	@Autowired
	private RestaurantServiceImpl restaurantServiceImpl;
	

	@PostMapping("/public/register")
	public ResponseEntity<RestaurantRegistrationDTO> restaurantRegeister(@RequestBody RestaurantRegistrationDTO restaurantreg) {
		return ResponseEntity.ok(restaurantServiceImpl.registerRestaurant(restaurantreg));
	}

	@PutMapping("/restaurant/update/{restaurantId}")
	public ResponseEntity<RestaurantRegistrationDTO> updateRestaurant(@PathVariable Integer restaurantId, @RequestBody Restaurant reqres) {
		return ResponseEntity.ok(restaurantServiceImpl.updatedRestaurantProfile(restaurantId, reqres));
	}

	@GetMapping("/restaurant/profile/info")
	public ResponseEntity<RestaurantRegistrationDTO> getRestaurantInfo() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		RestaurantRegistrationDTO response = restaurantServiceImpl.getRestaurantInfo(email);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}
	
	@GetMapping("/public/all")
    public ResponseEntity<List<RestaurantRegistrationDTO>> getAllRestaurants() {
        List<RestaurantRegistrationDTO> response = restaurantServiceImpl.getAllRestaurants();
        if (response.isEmpty() || response.get(0).getStatusCode() == 404) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(response);
    }
	
	/*
	@GetMapping("/restaurant/{id}")
    public ResponseEntity<List<RestaurantRegistrationDTO>> getRestaurantsById(@PathVariable Long id) {
        List<RestaurantRegistrationDTO> restaurants = restaurantServiceImpl.getAllRestaurantsById(id);
        
        if (restaurants.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }
        
        return ResponseEntity.ok(restaurants);
    }
	
	@GetMapping("/get-all-restaurants")
	public ResponseEntity<RestaurantRegistrationDTO> getAllRestaurants() {
		return ResponseEntity.ok(RestaurantServiceImpl.getAllRestaurants());

	}*/

}
