package com.reservemate.ReserveMate_backend.restaurant;

import java.util.ArrayList;
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
			
			restaurant.setName(restaurantRegistrationRequest.getName());
			restaurant.setEmail(restaurantRegistrationRequest.getEmail());
			restaurant.setCity(restaurantRegistrationRequest.getCity());
			restaurant.setDistrict(restaurantRegistrationRequest.getDistrict());
			restaurant.setMobile(restaurantRegistrationRequest.getMobile());
			String profilepircture = restaurantRegistrationRequest.getPicture();
	        if (profilepircture != null && profilepircture.startsWith("data:image")) {
	        	profilepircture = profilepircture.split(",")[1]; 
	        }
	        restaurant.setPicture(profilepircture);
	        
	       
	        
			restaurant.setRole("RESTAURANT");
			restaurant.setPassword(passwordEncoder.encode(restaurantRegistrationRequest.getPassword()));
			restaurant.setAddress(restaurantRegistrationRequest.getAddress());
			String menu = restaurantRegistrationRequest.getMenu();
		        if (menu != null && menu.startsWith("data:image")) {
		        	menu = menu.split(",")[1]; 
		        }
		        restaurant.setMenu(menu);
			restaurant.setDescription(restaurantRegistrationRequest.getDescription());
			restaurant.setOperationHours(restaurantRegistrationRequest.getOperationHours());

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
	            	
	            	existingRestaurant.setEmail(updatedRestaurantProfile.getEmail());
	            	existingRestaurant.setName(updatedRestaurantProfile.getName());
	            	existingRestaurant.setCity(updatedRestaurantProfile.getCity());
	            	existingRestaurant.setDistrict(updatedRestaurantProfile.getDistrict());
	            	existingRestaurant.setMobile(updatedRestaurantProfile.getMobile());
	            	existingRestaurant.setPicture(updatedRestaurantProfile.getPicture());
	            	existingRestaurant.setAddress(updatedRestaurantProfile.getAddress());
	            	existingRestaurant.setDescription(updatedRestaurantProfile.getDescription());
	            	existingRestaurant.setMenu(updatedRestaurantProfile.getMenu());
	            	existingRestaurant.setOperationHours(updatedRestaurantProfile.getOperationHours());


	            	
	                // Check if password is present in the request
	                if (updatedRestaurantProfile.getPassword() != null && !updatedRestaurantProfile.getPassword().isEmpty()) {
	                    // Encode the password and update it
	                	existingRestaurant.setPassword(passwordEncoder.encode(updatedRestaurantProfile.getPassword()));
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
	    
	    
	    /*
	    @Override
	    public List<RestaurantRegistrationDTO> getAllRestaurantsById(Long id) {
	        List<RestaurantRegistrationDTO> responseList = new ArrayList<>();

	        try {
	            Optional<Restaurant> restaurantOptional = restaurantRepository.findById(id);
	            
	            if (restaurantOptional.isPresent()) {
	                Restaurant restaurant = restaurantOptional.get();
	                RestaurantRegistrationDTO restaurantDTO = new RestaurantRegistrationDTO();
	                restaurantDTO.setUser(restaurant);
	                restaurantDTO.setStatusCode(200);
	                restaurantDTO.setMessage("Restaurants retrieved successfully");
	                responseList.add(restaurantDTO);
	            } else {
	                RestaurantRegistrationDTO errorResponse = new RestaurantRegistrationDTO();
	                errorResponse.setStatusCode(404);
	                errorResponse.setMessage("Restaurant not found for the given ID");
	                responseList.add(errorResponse);
	            }
	        } catch (Exception e) {
	            RestaurantRegistrationDTO errorResponse = new RestaurantRegistrationDTO();
	            errorResponse.setStatusCode(500);
	            errorResponse.setMessage("Error occurred while retrieving restaurants: " + e.getMessage());
	            responseList.add(errorResponse);
	        }

	        return responseList;
	    }*/
	    
	    /*@Override
		 public RestaurantRegistrationDTO getAllRestaurants() {
			 RestaurantRegistrationDTO reqRes = new RestaurantRegistrationDTO();

		        try {
		            List<Restaurant> result = restaurantRepository.findAll();
		            if (!result.isEmpty()) {
		                //reqRes.setUserList(result);
		                reqRes.setStatusCode(200);
		                reqRes.setMessage("Successful");
		            } else {
		                reqRes.setStatusCode(404);
		                reqRes.setMessage("No users found");
		            }
		            return reqRes;
		        } catch (Exception e) {
		            reqRes.setStatusCode(500);
		            reqRes.setMessage("Error occurred: " + e.getMessage());
		            return reqRes;
		        }
		    }*/
	    
	    
	
	/*@Override
	public List<Restaurant> getAllRestaurant() {
		return restaurantRepository.findAll();
	}*/
	
	    @Override
		public Restaurant findById(long id) {
			return restaurantRepository.findById(id);
		}
	

}
