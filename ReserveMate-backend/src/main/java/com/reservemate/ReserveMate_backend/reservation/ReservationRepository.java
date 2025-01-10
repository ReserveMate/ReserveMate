package com.reservemate.ReserveMate_backend.reservation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    Optional<Reservation> findById(Long reservationId);

   
}
