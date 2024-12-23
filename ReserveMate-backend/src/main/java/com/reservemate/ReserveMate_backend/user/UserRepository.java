package com.reservemate.ReserveMate_backend.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends  JpaRepository<User, Integer> {

	User findById(long id);
	Optional<User> findByEmail(String email);
	User findByRole(String role);
	
}
