package com.reservemate.ReserveMate_backend.reservation;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
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
	 
	 private String status;
	 
	 private String cancelationPolicy;
	 
	 private LocalDateTime reserveDateTime;

	 @CreationTimestamp
	 private LocalDateTime created;

	 @UpdateTimestamp
	 private LocalDateTime lastModified;

	
}
