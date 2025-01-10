package com.reservemate.ReserveMate_backend.reservation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationDTO {

	private int statusCode;
	private String error;
	private String message;

	private String specialRequest;

	private int reservingHours;

	private String customerName;
	private String customerMobile;
	private int tableNumber;
	private String tableStatus;
}
