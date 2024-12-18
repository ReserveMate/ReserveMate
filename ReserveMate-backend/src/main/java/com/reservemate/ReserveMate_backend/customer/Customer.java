package com.reservemate.ReserveMate_backend.customer;

import java.util.ArrayList;
import java.util.List;

import com.reservemate.ReserveMate_backend.reservation.Reservation;
import com.reservemate.ReserveMate_backend.restaurant.Restaurant;
import com.reservemate.ReserveMate_backend.user.User;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Setter
@Getter
@NoArgsConstructor
@DiscriminatorValue(value = "Customer")
public class Customer extends User{


    @OneToMany(mappedBy = "customer")
    private List<Reservation> reservations = new ArrayList<>();
}
