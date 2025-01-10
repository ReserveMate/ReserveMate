package com.reservemate.ReserveMate_backend.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	

	

	    @Autowired
	    private ReservationService reservationService;

	    
	    @PostMapping("/create")
	    public ResponseEntity<ReservationDTO> createReservation(
	            @RequestBody ReservationDTO reservationDTO,
	            @RequestParam Long customerId,
	            @RequestParam Long tableId) {
	        ReservationDTO response = reservationService.createReservation(reservationDTO, customerId, tableId);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @GetMapping("/{reservationId}")
	    public ResponseEntity<ReservationDTO> getReservationDetails(@PathVariable Long reservationId) {
	        ReservationDTO response = reservationService.getReservationDetails(reservationId);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @PutMapping("/cancel/{reservationId}")
	    public ResponseEntity<ReservationDTO> cancelReservation(
	            @PathVariable Long reservationId,
	            @RequestParam ReservationStatus status) {
	        ReservationDTO response = reservationService.cancelReservation(reservationId, status);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @PutMapping("/complete/{reservationId}")
	    public ResponseEntity<ReservationDTO> completeReservation(
	            @PathVariable Long reservationId,
	            @RequestParam ReservationStatus status) {
	        ReservationDTO response = reservationService.completeReservation(reservationId, status);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @GetMapping("/all")
	    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
	        List<ReservationDTO> response = reservationService.getAllReservations();
	        return ResponseEntity.ok(response);
	    }
	

}
