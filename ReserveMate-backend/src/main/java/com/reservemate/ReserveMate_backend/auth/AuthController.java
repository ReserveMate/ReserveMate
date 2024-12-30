package com.reservemate.ReserveMate_backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.reservemate.ReserveMate_backend.user.UserServiceImpl;

@RestController
public class AuthController {
	
	@Autowired
	private UserServiceImpl userServiceImpl;

	@PostMapping("/auth/login")
	public ResponseEntity<LoginDTO> login(@RequestBody LoginDTO req) {
		return ResponseEntity.ok(userServiceImpl.login(req));
	}

	@PostMapping("/auth/refresh")
	public ResponseEntity<LoginDTO> refreshToken(@RequestBody LoginDTO req) {
		return ResponseEntity.ok(userServiceImpl.refreshToken(req));
	}

}
