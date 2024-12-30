package com.reservemate.ReserveMate_backend.user;

import com.reservemate.ReserveMate_backend.auth.LoginDTO;

public interface UserService {

	LoginDTO login(LoginDTO loginRequest);
	
	LoginDTO refreshToken(LoginDTO refreshTokenReqiest);
}
