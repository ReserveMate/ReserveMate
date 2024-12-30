package com.reservemate.ReserveMate_backend.customer;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.reservemate.ReserveMate_backend.reservation.Reservation;
import com.reservemate.ReserveMate_backend.restaurant.Advertisement;
import com.reservemate.ReserveMate_backend.restaurant.Facility;
import com.reservemate.ReserveMate_backend.restaurant.Restaurant;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;
import com.reservemate.ReserveMate_backend.user.User;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Builder;

import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@DiscriminatorValue(value = "Customer")
public class Customer extends User{


    @OneToMany(mappedBy = "customer")
    private List<Reservation> reservations = new ArrayList<>();
    
    @Builder
    public Customer(Integer id, String email, String password, String name, String mobile, String picture, String role, 
    		String district, String city, List<Reservation> reservation, LocalDateTime createDateTime,
			LocalDateTime updatedDateTime ) {
    	super(id, email, password, name, mobile, picture,role, district, city, createDateTime,
    			 updatedDateTime);
    	this.reservations = reservations != null ? reservations : new ArrayList<>();
    	
    }
}
