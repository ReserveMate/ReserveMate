package com.reservemate.ReserveMate_backend.admin;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AdminRepository extends  JpaRepository<Admin, Long> {

	Admin findById(long id);
	Admin findByEmail(String email);
	Admin findByRole(String role);
	
}

