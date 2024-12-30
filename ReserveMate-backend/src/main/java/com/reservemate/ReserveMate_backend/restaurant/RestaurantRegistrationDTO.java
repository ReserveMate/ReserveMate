package com.reservemate.ReserveMate_backend.restaurant;

import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;
import com.reservemate.ReserveMate_backend.user.User;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantRegistrationDTO {

	private int statusCode;
	private String error;
	private String message;
	private String token;
	private String refreshToken;
	private String expirationTime;
	
	private String email;
    private String password;
    private String name;
    private String role;
	private String mobile;
	private String district;
	private String city;
	private String picture;
    private String address;
    private String menu; 
    private String operationHours;
    private String description;
    private List<RestaurantTable> tableList;
    private List<Facility> facilityList;
    private List<Advertisement> advertisementList;
    private User user;
    private List<User> userList;
    
   

}
