package com.reservemate.ReserveMate_backend.restaurant;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        try {
            
            List<RestaurantRegistrationDTO> restaurantList = restaurantServiceImpl.getAllRestaurants();

           
            if (restaurantList.isEmpty() || restaurantList.get(0).getStatusCode() == 404) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(restaurantList);
            } else if (restaurantList.get(0).getStatusCode() == 500) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(restaurantList);
            }

            
            return ResponseEntity.ok(restaurantList);

        } catch (Exception e) {
           
            RestaurantRegistrationDTO errorResponse = new RestaurantRegistrationDTO();
            errorResponse.setStatusCode(500);
            errorResponse.setError("Unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of(errorResponse));
        }
    }
	
	
	@GetMapping("/public/{id}")
	public ResponseEntity<RestaurantRegistrationDTO> getRestaurantById(@PathVariable Long id) {
	    try {
	        RestaurantRegistrationDTO restaurant = restaurantServiceImpl.findRestaurantById(id);
	        if (restaurant == null) {
	            return ResponseEntity.status(404).body(null);
	        }
	        return ResponseEntity.ok(restaurant);
	    } catch (Exception e) {
	        RestaurantRegistrationDTO errorResponse = new RestaurantRegistrationDTO();
	        errorResponse.setStatusCode(500);
	        errorResponse.setError("Unexpected error occurred: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	    }
	}
	
	
	

}
