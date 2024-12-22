package com.reservemate.ReserveMate_backend.restaurant;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.reservemate.ReserveMate_backend.reservation.Reservation;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;
import com.reservemate.ReserveMate_backend.user.User;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@DiscriminatorValue(value = "Restaurant")
@NoArgsConstructor
public class Restaurant extends User {

	private String address;
	
	private String menu;
	
	@OneToMany(mappedBy = "restaurant")
	private List<Facility> facility = new ArrayList<>();
	
	@OneToMany(mappedBy = "restaurant")
	private List<Advertisement> advertisement;
	 
	private String operationHours;
	 
	private String description;
	
	@OneToMany(mappedBy = "restaurant")
    private List<RestaurantTable> tables = new ArrayList<>();


    @OneToMany(mappedBy = "restaurant")
    private List<Reservation> reservations = new ArrayList<>();
	 
    @Builder
    public Restaurant(long id, String email, String password, String name, String mobile, String picture, String role, 
    		String district, String city, String address, String menu, List<Facility> facility, List<Advertisement> advertisement, 
    		List<RestaurantTable> tables, List<Reservation> reservation, String operationHours, String description, LocalDateTime createDateTime,
			LocalDateTime updatedDateTime ) {
    	super(id, email, password, name, mobile, picture,role, district, city, createDateTime,
    			 updatedDateTime);
    	this.address = address;
        this.menu = menu;
        this.facility = facility != null ? facility : new ArrayList<>();
        this.advertisement = advertisement != null ? advertisement : new ArrayList<>();
        this.tables = tables != null ? tables : new ArrayList<>();
        this.reservations = reservations != null ? reservations : new ArrayList<>();
        this.operationHours = operationHours;
        this.description = description;
    	
    }
	
}
