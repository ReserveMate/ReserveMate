package com.reservemate.ReserveMate_backend.reservation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.customer.Customer;
import com.reservemate.ReserveMate_backend.customer.CustomerRepository;
import com.reservemate.ReserveMate_backend.table.RestaurantTable;
import com.reservemate.ReserveMate_backend.table.RestaurantTableRepository;
import com.reservemate.ReserveMate_backend.table.RestaurantTableStatus;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private RestaurantTableRepository tableRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public ReservationDTO createReservation(ReservationDTO reservationDTO, Long customerId, Long tableId) {
		ReservationDTO response = new ReservationDTO();

		try {

			Customer customer = customerRepository.findById(customerId);
			RestaurantTable table = tableRepository.findById(tableId);

			if (customer == null) {
				response.setStatusCode(404);
				response.setError("Customer not found");
				return response;
			}

			if (table == null || table.getStatus() != RestaurantTableStatus.AVAILABLE) {
				response.setStatusCode(400);
				response.setError("Table is not available for reservation");
				return response;
			}

	
			Reservation reservation = new Reservation();
			reservation.setCustomer(customer);
			reservation.setTable(table);
			reservation.setSpecialRequest(reservationDTO.getSpecialRequest());
			reservation.setReservingHours(reservationDTO.getReservingHours());
			reservation.setStatus(ReservationStatus.PENDING);

		
			table.setStatus(RestaurantTableStatus.RESERVED);
			tableRepository.save(table);

		
			Reservation savedReservation = reservationRepository.save(reservation);

		
			response.setSpecialRequest(savedReservation.getSpecialRequest());
			response.setReservingHours(savedReservation.getReservingHours());
			response.setMessage("Reservation created successfully");
			response.setStatusCode(201);

		} catch (Exception e) {
			response.setStatusCode(500);
			response.setError("Error occurred: " + e.getMessage());
		}

		return response;
	}

	@Override
	public ReservationDTO getReservationDetails(Long reservationId) {
		ReservationDTO response = new ReservationDTO();

		try {
		
			Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
			if (reservation == null) {
				response.setStatusCode(404);
				response.setError("Reservation not found");
				return response;
			}

		
			response.setSpecialRequest(reservation.getSpecialRequest());
			response.setReservingHours(reservation.getReservingHours());
			response.setMessage("Reservation details retrieved successfully");
			response.setStatusCode(200);

		} catch (Exception e) {
			response.setStatusCode(500);
			response.setError("Error occurred: " + e.getMessage());
		}

		return response;
	}
	
	
	@Override
    public ReservationDTO cancelReservation(Long reservationId, ReservationStatus status) {
        ReservationDTO response = new ReservationDTO();
        
        try {
            Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
            if (optionalReservation.isPresent()) {
                Reservation reservation = optionalReservation.get();
                reservation.setStatus(ReservationStatus.CANCELLED);
                reservationRepository.save(reservation);
                
                reservation.setStatus(status);
                
                if (status == ReservationStatus.CANCELLED) { 
                    RestaurantTable table = reservation.getTable();
                    table.setStatus(RestaurantTableStatus.AVAILABLE);
                    tableRepository.save(table);
                }
                
                response.setMessage("Reservation cancelled successfully");
                response.setStatusCode(200);
            } else {
                response.setStatusCode(404);
                response.setError("Reservation not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError("Error occurred: " + e.getMessage());
        }

        return response;
    }
	
	@Override
    public ReservationDTO completeReservation(Long reservationId, ReservationStatus status) {
        ReservationDTO response = new ReservationDTO();
        
        try {
            Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
            if (optionalReservation.isPresent()) {
                Reservation reservation = optionalReservation.get();
                reservation.setStatus(ReservationStatus.COMPLETE);
                reservationRepository.save(reservation);
                
                reservation.setStatus(status);
                
                if (status == ReservationStatus.COMPLETE) { 
                    RestaurantTable table = reservation.getTable();
                    table.setStatus(RestaurantTableStatus.AVAILABLE);
                    tableRepository.save(table);
                }
                
                response.setMessage("Reservation completed successfully");
                response.setStatusCode(200);
            } else {
                response.setStatusCode(404);
                response.setError("Reservation not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError("Error occurred: " + e.getMessage());
        }

        return response;
    }
	
	
	@Override
	public List<ReservationDTO> getAllReservations() {
	    List<ReservationDTO> responseList = new ArrayList<>();

	    try {
	        List<Reservation> reservations = reservationRepository.findAll();

	        for (Reservation reservation : reservations) {
	            ReservationDTO dto = new ReservationDTO();

	          
	            dto.setSpecialRequest(reservation.getSpecialRequest());
	            dto.setReservingHours(reservation.getReservingHours());
	            dto.setMessage("Reservation fetched successfully");
	            dto.setStatusCode(200);

	          
	            if (reservation.getCustomer() != null) {
	                dto.setCustomerName(reservation.getCustomer().getName());
	                dto.setCustomerMobile(reservation.getCustomer().getMobile());
	            }

	           
	            if (reservation.getTable() != null) {
	                dto.setTableNumber(reservation.getTable().getTableNumber());
	                dto.setTableStatus(reservation.getTable().getStatus().toString());
	            }

	            responseList.add(dto);
	        }
	    } catch (Exception e) {
	        ReservationDTO errorDto = new ReservationDTO();
	        errorDto.setStatusCode(500);
	        errorDto.setError("Error occurred: " + e.getMessage());
	        responseList.add(errorDto);
	    }

	    return responseList;
	}


}
