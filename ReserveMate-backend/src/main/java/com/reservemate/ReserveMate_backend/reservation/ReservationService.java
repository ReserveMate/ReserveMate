package com.reservemate.ReserveMate_backend.reservation;

import java.util.List;

public interface ReservationService {
	
	ReservationDTO createReservation(ReservationDTO reservationDTO, Long customerId, Long tableId);
	ReservationDTO getReservationDetails(Long reservationId);
	public List<ReservationDTO> getAllReservations();
	ReservationDTO completeReservation(Long reservationId, ReservationStatus status);
	ReservationDTO cancelReservation(Long reservationId, ReservationStatus status);
}
