package com.reservemate.ReserveMate_backend.table;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantTableDTO {

	
	private int statusCode;
	private String error;
	private String message;
	
	private int tableNumber;
	private int seatingCapacity;
	private String description;
	private String restaurantTablePicture;
	private String tableStatus;
	    

}
