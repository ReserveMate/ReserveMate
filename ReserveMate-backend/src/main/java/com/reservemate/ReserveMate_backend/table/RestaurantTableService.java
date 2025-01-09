package com.reservemate.ReserveMate_backend.table;

import java.util.List;

public interface RestaurantTableService {

	RestaurantTableDTO createTable(RestaurantTableDTO tableDTO, Long restaurantId);
    RestaurantTableDTO getTableById(Long tableId);
    List<RestaurantTableDTO> getAllTablesByRestaurant(Integer restaurantId);
    RestaurantTableDTO updateTable(Long id, RestaurantTableDTO tableDTO);
    RestaurantTableDTO deleteTable(Long id);
}
