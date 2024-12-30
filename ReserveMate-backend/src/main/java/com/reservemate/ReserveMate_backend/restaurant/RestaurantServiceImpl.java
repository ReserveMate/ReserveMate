package com.reservemate.ReserveMate_backend.restaurant;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.customer.Customer;
import com.reservemate.ReserveMate_backend.customer.CustomerSignupDTO;
import com.reservemate.ReserveMate_backend.user.User;
import com.reservemate.ReserveMate_backend.user.UserRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService{
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	public RestaurantServiceImpl(UserRepository userRepository, RestaurantRepository restaurantRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.restaurantRepository = restaurantRepository;
	}

	@Override
	public RestaurantRegistrationDTO registerRestaurant(RestaurantRegistrationDTO restaurantRegistrationRequest) {
		
		RestaurantRegistrationDTO restaurantRegistration = new RestaurantRegistrationDTO();


		try {
			
			Restaurant restaurant = new Restaurant();
			
			restaurant.setName(restaurantRegistration.getName());
			restaurant.setEmail(restaurantRegistration.getEmail());
			restaurant.setCity(restaurantRegistration.getCity());
			restaurant.setDistrict(restaurantRegistration.getDistrict());
			restaurant.setMobile(restaurantRegistration.getMobile());
			restaurant.setPicture(restaurantRegistration.getPicture());
			restaurant.setRole("ROLE_RESTAURANT");
			restaurant.setPassword(passwordEncoder.encode(restaurantRegistration.getPassword()));
			restaurant.setAddress(restaurantRegistration.getAddress());
			restaurant.setMenu(restaurantRegistration.getMenu());
			restaurant.setDescription(restaurantRegistration.getDescription());
			restaurant.setOperationHours(restaurantRegistration.getOperationHours());

			User usersResult = userRepository.save(restaurant);
			
			if (usersResult.getId() > 0) { 
				restaurantRegistration.setUser((usersResult));
				restaurantRegistration.setMessage("Restaurant Registered Successfully");
				restaurantRegistration.setStatusCode(200);
			}

		} catch (Exception e) {
			restaurantRegistration.setStatusCode(500);
			restaurantRegistration.setError(e.getMessage());
		}
		return restaurantRegistration;
	}
	
	public RestaurantRegistrationDTO updatedRestaurantProfile(Integer restaurantId, Restaurant updatedRestaurantProfile) {
		RestaurantRegistrationDTO updateRestaurantProfile = new RestaurantRegistrationDTO();
	        try {
	        	
	            Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);
	            
	            if (restaurantOptional.isPresent()) {
	            	
	            	Restaurant existingRestaurant = restaurantOptional.get();
	            	
	            	existingRestaurant.setEmail(updateRestaurantProfile.getEmail());
	            	existingRestaurant.setName(updateRestaurantProfile.getName());
	            	existingRestaurant.setCity(updateRestaurantProfile.getCity());
	            	existingRestaurant.setDistrict(updateRestaurantProfile.getDistrict());
	            	existingRestaurant.setMobile(updateRestaurantProfile.getMobile());
	            	existingRestaurant.setPicture(updateRestaurantProfile.getPicture());
	            	existingRestaurant.setAddress(updateRestaurantProfile.getAddress());
	            	existingRestaurant.setDescription(updateRestaurantProfile.getDescription());
	            	existingRestaurant.setMenu(updateRestaurantProfile.getMenu());
	            	existingRestaurant.setOperationHours(updateRestaurantProfile.getOperationHours());


	            	
	                // Check if password is present in the request
	                if (updateRestaurantProfile.getPassword() != null && !updateRestaurantProfile.getPassword().isEmpty()) {
	                    // Encode the password and update it
	                	existingRestaurant.setPassword(passwordEncoder.encode(updateRestaurantProfile.getPassword()));
	                }

	                Restaurant savedRestaurant = restaurantRepository.save(existingRestaurant);
	                updateRestaurantProfile.setUser(savedRestaurant);
	                updateRestaurantProfile.setStatusCode(200);
	                updateRestaurantProfile.setMessage("Profile updated successfully");
	            } else {
	            	updateRestaurantProfile.setStatusCode(404);
	            	updateRestaurantProfile.setMessage("Profile not found for update");
	            }
	        } catch (Exception e) {
	        	updateRestaurantProfile.setStatusCode(500);
	        	updateRestaurantProfile.setMessage("Error occurred while updating user: " + e.getMessage());
	        }
	        return updateRestaurantProfile;
	    }


	    public RestaurantRegistrationDTO getRestaurantInfo(String email){
	    	RestaurantRegistrationDTO viewRestaurantProfile = new RestaurantRegistrationDTO();
	        try {
	        	
	            Optional<Restaurant> restaurantOptional = restaurantRepository.findByEmail(email);
	            
	            if (restaurantOptional.isPresent()) {
	            	viewRestaurantProfile.setUser(restaurantOptional.get());
	            	viewRestaurantProfile.setStatusCode(200);
	            	viewRestaurantProfile.setMessage("successful");
	            } else {
	            	viewRestaurantProfile.setStatusCode(404);
	            	viewRestaurantProfile.setMessage("User not found for update");
	            }

	        }catch (Exception e){
	        	viewRestaurantProfile.setStatusCode(500);
	        	viewRestaurantProfile.setMessage("Error occurred while getting user info: " + e.getMessage());
	        }
	        return viewRestaurantProfile;

	    }
	
	@Override
	public List<Restaurant> getAllRestaurant() {
		return restaurantRepository.findAll();
	}
	
	@Override
	public Restaurant findById(long id) {
		return restaurantRepository.findById(id);
	}

}
