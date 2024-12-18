package com.reservemate.ReserveMate_backend.table;

import com.reservemate.ReserveMate_backend.restaurant.Restaurant;

import java.util.ArrayList;
import java.util.List;

import com.reservemate.ReserveMate_backend.reservation.Reservation;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RestaurantTable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int tableNumber;
	private int capacity;
	private String description;

	@ManyToOne
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;

	@OneToMany(mappedBy = "table")
	private List<Reservation> reservations = new ArrayList<>();
}
