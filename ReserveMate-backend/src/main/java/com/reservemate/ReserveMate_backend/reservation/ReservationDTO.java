package com.reservemate.ReserveMate_backend.reservation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationDTO {

	
	 private String type;
	 
	 private String specialRequest;
	 
	 private String numberofPeople;
	 
	 private String status;
	 
	 private String reservingHours;
}
