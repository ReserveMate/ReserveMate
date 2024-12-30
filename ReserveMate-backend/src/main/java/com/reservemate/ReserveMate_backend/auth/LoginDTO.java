package com.reservemate.ReserveMate_backend.auth;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reservemate.ReserveMate_backend.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginDTO {

	private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String role;
    private String email;
    private String password;
    private User user;
    private List<User> userList;
}
