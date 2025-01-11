package com.reservemate.ReserveMate_backend.table;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.restaurant.Restaurant;

import com.reservemate.ReserveMate_backend.restaurant.RestaurantService;


@Service
public class RestaurantTableServiceImpl implements RestaurantTableService {

	@Autowired
	private RestaurantTableRepository tableRepository;

	@Autowired
	private RestaurantService restaurantService;
	
	@Override
	public RestaurantTableDTO createTable(RestaurantTableDTO tableDTO, Long restaurantId) {
	    RestaurantTableDTO response = new RestaurantTableDTO();

	    try {
	        
	        Restaurant restaurant = restaurantService.findById(restaurantId);
	        if (restaurant == null) {
	            response.setStatusCode(404);
	            response.setError("Restaurant not found");
	            return response;
	        }

	        
	        RestaurantTable table = new RestaurantTable();
	        
	        table.setTableNumber(tableDTO.getTableNumber());
	        table.setCapacity(tableDTO.getSeatingCapacity());
	        table.setDescription(tableDTO.getDescription());
	        table.setReservationPrice(tableDTO.getReservationPrice());
	        table.setRestaurant(restaurant);
	        table.setStatus(RestaurantTableStatus.AVAILABLE);

	        
	        String tablePicture = tableDTO.getRestaurantTablePicture();
	        if (tablePicture != null && tablePicture.startsWith("data:image")) {
	            tablePicture = tablePicture.split(",")[1];
	        }
	        table.setRestaurantTablePicture(tablePicture);

	        
	        RestaurantTable savedTable = tableRepository.save(table);

	        
	        response.setTableNumber(savedTable.getTableNumber());
	        response.setSeatingCapacity(savedTable.getCapacity());
	        response.setDescription(savedTable.getDescription());
	        response.setReservationPrice(savedTable.getReservationPrice());
	        response.setRestaurantTablePicture(savedTable.getRestaurantTablePicture());
	        response.setMessage("Table created successfully");
	        response.setStatusCode(201);

	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setError("Error occurred: " + e.getMessage());
	    }

	    return response;
	}
	
	@Override
	public RestaurantTableDTO getTableById(Long tableId) {
	    RestaurantTableDTO response = new RestaurantTableDTO();

	    try {
	        
	        RestaurantTable table = tableRepository.findById(tableId);
	        if (table == null) {
	            response.setStatusCode(404);
	            response.setError("Table not found");
	            return response;
	        }

	       
	        response.setTableNumber(table.getTableNumber());
	        response.setSeatingCapacity(table.getCapacity());
	        response.setDescription(table.getDescription());
	        response.setReservationPrice(table.getReservationPrice());
	        response.setRestaurantTablePicture(table.getRestaurantTablePicture());
	        response.setTableStatus(table.getStatus().toString()); 
	        response.setMessage("Table retrieved successfully");
	        response.setStatusCode(200);

	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setError("Error occurred: " + e.getMessage());
	    }

	    return response;
	}
	
	@Override
	public RestaurantTableDTO updateTable(Long tableId, RestaurantTableDTO tableDTO) {
	    RestaurantTableDTO response = new RestaurantTableDTO();

	    try {
	        
	        RestaurantTable table = tableRepository.findById(tableId);
	        if (table == null) {
	            response.setStatusCode(404);
	            response.setError("Table not found");
	            return response;
	        }

	        
	        table.setTableNumber(tableDTO.getTableNumber());
	        table.setCapacity(tableDTO.getSeatingCapacity());
	        table.setDescription(tableDTO.getDescription());
	        table.setReservationPrice(tableDTO.getReservationPrice());
	        
	        String tablePicture = tableDTO.getRestaurantTablePicture();
	        if (tablePicture != null && tablePicture.startsWith("data:image")) {
	            tablePicture = tablePicture.split(",")[1];
	        }
	        table.setRestaurantTablePicture(tablePicture);

	        
	        RestaurantTable updatedTable = tableRepository.save(table);

	        
	        response.setTableNumber(updatedTable.getTableNumber());
	        response.setSeatingCapacity(updatedTable.getCapacity());
	        response.setDescription(updatedTable.getDescription());
	        response.setReservationPrice(updatedTable.getReservationPrice());
	        response.setRestaurantTablePicture(updatedTable.getRestaurantTablePicture());
	        response.setMessage("Table updated successfully");
	        response.setStatusCode(200);

	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setError("Error occurred: " + e.getMessage());
	    }

	    return response;
	}
	
	@Override
	public RestaurantTableDTO deleteTable(Long tableId) {
	    RestaurantTableDTO response = new RestaurantTableDTO();

	    try {
	        
	        RestaurantTable table = tableRepository.findById(tableId);
	        if (table == null) {
	            response.setStatusCode(404);
	            response.setError("Table not found");
	            return response;
	        }

	        
	        tableRepository.delete(table);

	        
	        response.setMessage("Table deleted successfully");
	        response.setStatusCode(200);

	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setError("Error occurred: " + e.getMessage());
	    }

	    return response;
	}


	@Override
	public List<RestaurantTableDTO> getAllTablesByRestaurant(Integer restaurantId) {
	    List<RestaurantTableDTO> responseList = new ArrayList<>();

	    try {
	        
	        Restaurant restaurant = restaurantService.findById(restaurantId);
	        if (restaurant == null) {
	            throw new IllegalArgumentException("Restaurant not found");
	        }

	        
	        List<RestaurantTable> tables = tableRepository.findByRestaurantId(restaurantId);

	        
	        for (RestaurantTable table : tables) {
	            RestaurantTableDTO tableDTO = new RestaurantTableDTO();
	            tableDTO.setTableNumber(table.getTableNumber());
	            tableDTO.setSeatingCapacity(table.getCapacity());
	            tableDTO.setDescription(table.getDescription());
	            tableDTO.setReservationPrice(table.getReservationPrice());
	            tableDTO.setRestaurantTablePicture(table.getRestaurantTablePicture());
	            tableDTO.setTableStatus(table.getStatus().toString());
	            responseList.add(tableDTO);
	        }

	    } catch (IllegalArgumentException e) {
	        
	        RestaurantTableDTO errorResponse = new RestaurantTableDTO();
	        errorResponse.setStatusCode(404);
	        errorResponse.setError(e.getMessage());
	        responseList.add(errorResponse);

	    } catch (Exception e) {
	        
	        RestaurantTableDTO errorResponse = new RestaurantTableDTO();
	        errorResponse.setStatusCode(500);
	        errorResponse.setError("Error occurred: " + e.getMessage());
	        responseList.add(errorResponse);
	    }

	    return responseList;
	}



}
