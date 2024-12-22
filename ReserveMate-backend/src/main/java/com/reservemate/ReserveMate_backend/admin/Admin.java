package com.reservemate.ReserveMate_backend.admin;

import java.time.LocalDateTime;

import com.reservemate.ReserveMate_backend.user.User;

import lombok.Builder;

public class Admin extends User{

	@Builder
    public Admin(long id, String email, String password, String name, String mobile, String picture, String role, 
    		String district, String city, LocalDateTime createDateTime,
			LocalDateTime updatedDateTime ) {
    	super(id, email, password, name, mobile, picture,role, district, city, createDateTime,
    			 updatedDateTime);
    	
    	
    }
}
