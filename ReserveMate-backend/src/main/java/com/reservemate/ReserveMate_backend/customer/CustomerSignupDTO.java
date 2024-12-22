package com.reservemate.ReserveMate_backend.customer;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerSignupDTO {

	private String email;
    private String password;
    private String district;
    private String city;
}
