package com.reservemate.ReserveMate_backend.restaurant;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


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
    private String address;
    private String menu; 
    private String operationHours;
    private String description;
    private String city;

}
