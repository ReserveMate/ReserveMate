package com.reservemate.ReserveMate_backend.customer;

import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.reservemate.ReserveMate_backend.user.User;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerSignupDTO {

	private int statusCode;
	private String error;
	private String message;
	private String token;
	private String refreshToken;
	private String expirationTime;
	private String name;
	private String email;
	private String password;
	private String picture;
	private String role;
	private String mobile;
	private String district;
	private String city;
	private User user;
    private List<User> userList;
}
