import axios from "axios";

class RestaurantTableService {
  static BASE_URL = "http://localhost:8080/api/tables";

  /**
   * Create a new table for a specific restaurant.
   * @param {Object} tableData - Data for the table to be created.
   * @param {number} restaurantId - ID of the restaurant.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Object>} Response data.
   */
  static async createTable(tableData, restaurantId, token) {
    try {
      const response = await axios.post(
        `${RestaurantTableService.BASE_URL}/create/${restaurantId}`,
        tableData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get table details by its ID.
   * @param {number} tableId - ID of the table to fetch details for.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Object>} Response data.
   */
  static async getTableById(tableId, token) {
    try {
      const response = await axios.get(
        `${RestaurantTableService.BASE_URL}/${tableId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get all tables for a specific restaurant.
   * @param {number} restaurantId - ID of the restaurant.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Array>} List of tables.
   */
  static async getTablesByRestaurant(restaurantId, token) {
    try {
      const response = await axios.get(
        `${RestaurantTableService.BASE_URL}/restaurant/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Update table details by its ID.
   * @param {number} tableId - ID of the table to be updated.
   * @param {Object} tableData - Updated table data.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Object>} Response data.
   */
  static async updateTable(tableId, tableData, token) {
    try {
      const response = await axios.put(
        `${RestaurantTableService.BASE_URL}/update/${tableId}`,
        tableData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Delete a table by its ID.
   * @param {number} tableId - ID of the table to be deleted.
   * @param {string} token - Bearer token for authorization.
   * @returns {Promise<Object>} Response data.
   */
  static async deleteTable(tableId, token) {
    try {
      const response = await axios.delete(
        `${RestaurantTableService.BASE_URL}/delete/${tableId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default RestaurantTableService;
