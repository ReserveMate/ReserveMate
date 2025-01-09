package com.reservemate.ReserveMate_backend.reservation;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.reservemate.ReserveMate_backend.customer.Customer;
import com.reservemate.ReserveMate_backend.restaurant.Restaurant;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
	 
	 @Enumerated(EnumType.STRING)
	 private ReservationType type;
	 
	 private String specialRequest;
	 
	 private String numberofPeople;
	 
	 @Enumerated(EnumType.STRING)
	 private ReservationStatus status;
	 
	 private String reservingHours;
	 
	 @CreationTimestamp
	 private LocalDateTime created;

	 @UpdateTimestamp
	 private LocalDateTime lastModified;
	 private LocalDateTime deleted;
	 
	 @ManyToOne
   	 @JoinColumn(name = "customer_id")
	 private Customer customer;

	 @ManyToOne
	 @JoinColumn(name = "table_id")
	 private RestaurantTable table;

	 @ManyToOne
	 @JoinColumn(name = "restaurant_id")
	 private Restaurant restaurant;

	
}
