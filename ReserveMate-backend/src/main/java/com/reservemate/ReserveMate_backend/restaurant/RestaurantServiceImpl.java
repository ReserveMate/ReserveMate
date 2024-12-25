package com.reservemate.ReserveMate_backend.restaurant;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
			restaurant.setRole("RESTAURANT");
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
	
	@Override
	public List<Restaurant> getAllRestaurant() {
		return restaurantRepository.findAll();
	}
	
	@Override
	public Restaurant findById(long id) {
		return restaurantRepository.findById(id);
	}

}
