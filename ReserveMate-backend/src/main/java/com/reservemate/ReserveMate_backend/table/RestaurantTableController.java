package com.reservemate.ReserveMate_backend.table;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tables")
public class RestaurantTableController {

	

	
	    @Autowired
	    private RestaurantTableService tableService;

	   
	    @PostMapping("/create/{restaurantId}")
	    public ResponseEntity<RestaurantTableDTO> createTable(
	            @RequestBody RestaurantTableDTO tableDTO, 
	            @PathVariable Long restaurantId) {
	        RestaurantTableDTO response = tableService.createTable(tableDTO, restaurantId);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @GetMapping("/{tableId}")
	    public ResponseEntity<RestaurantTableDTO> getTableById(@PathVariable Long tableId) {
	        RestaurantTableDTO response = tableService.getTableById(tableId);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	    
	    @GetMapping("/restaurant/{restaurantId}")
	    public ResponseEntity<List<RestaurantTableDTO>> getTablesByRestaurant(@PathVariable Integer restaurantId) {
	        List<RestaurantTableDTO> tables = tableService.getAllTablesByRestaurant(restaurantId);
	        if (tables.isEmpty()) {
	            return ResponseEntity.status(404).body(null);
	        }
	        return ResponseEntity.ok(tables);
	    }

	    
	    @PutMapping("/update/{tableId}")
	    public ResponseEntity<RestaurantTableDTO> updateTable(
	            @RequestBody RestaurantTableDTO tableDTO, 
	            @PathVariable Long tableId) {
	        RestaurantTableDTO response = tableService.updateTable(tableId, tableDTO);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }

	   
	    @DeleteMapping("/delete/{tableId}")
	    public ResponseEntity<RestaurantTableDTO> deleteTable(@PathVariable Long tableId) {
	        RestaurantTableDTO response = tableService.deleteTable(tableId);
	        return ResponseEntity.status(response.getStatusCode()).body(response);
	    }
	

}
