package com.reservemate.ReserveMate_backend.table;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Integer> {
    List<RestaurantTable> findByRestaurantId(Integer restaurantId);
    RestaurantTable findById(long id);
}