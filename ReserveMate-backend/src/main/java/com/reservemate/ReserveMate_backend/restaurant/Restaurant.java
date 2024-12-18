package com.reservemate.ReserveMate_backend.restaurant;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.reservemate.ReserveMate_backend.reservation.Reservation;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;
import com.reservemate.ReserveMate_backend.user.Role;
import com.reservemate.ReserveMate_backend.user.User;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@DiscriminatorValue(value = "Restaurant")
@NoArgsConstructor
@Getter
@Setter
public class Restaurant extends User {

	private String Address;
	
	private String Menu;
	
	@OneToMany(mappedBy = "restaurant")
	private List<Facility> facility = new ArrayList<>();
	
	@OneToMany(mappedBy = "restaurant")
	private List<Advertisement> advertisement;
	 
	private String operationHours;
	 
	private String descirption;
	
	@OneToMany(mappedBy = "restaurant")
    private List<RestaurantTable> tables = new ArrayList<>();


    @OneToMany(mappedBy = "restaurant")
    private List<Reservation> reservations = new ArrayList<>();
	 
	
	
	
	
	
	/*
	 * @Builder public Restaurant(long id, String email, String password, String
	 * Name, String mobile, List<Role> roles,LocalDateTime createDateTime,
	 * LocalDateTime updatedDateTime) {
	 * 
	 * super(id,email, password, Name, mobile, roles, createDateTime,
	 * updatedDateTime); // //TODO Auto-generated constructor stub }
	 */
}
