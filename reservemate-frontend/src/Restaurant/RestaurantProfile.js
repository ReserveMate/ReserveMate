import React, { useState } from 'react';
import '../styles/RestaurantProfile.css';
import restaurantImage from '../assets/restaurant-image.jpg'; // Import the image

function RestaurantProfile() {
    const [restaurantName, setRestaurantName] = useState("Bubby's");
    const [restaurantDescription, setRestaurantDescription] = useState(
      "Bubby’s opened on Thanksgiving Day 1990. Chef / Owner Ron Silver began baking pies and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St. in Tribeca. Today, NYC’s beloved restaurant and pie shop celebrates 27 years of classic, made-from-scratch American cooking."
    );
    
    const [menuItems, setMenuItems] = useState([]); // Store menu items as images

    const [facilities, setFacilities] = useState(["Wi-Fi", "Parking", "Outdoor Seating"]);
    const [operatingHours, setOperatingHours] = useState({ open: "10:00 AM", close: "10:00 PM" });
    const [activeTab, setActiveTab] = useState('profile'); // State to handle the active tab
    const [reservations, setReservations] = useState([]); // Store reservation details
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [currentReservation, setCurrentReservation] = useState(null); // Store current reservation for editing

    // Handle edit actions for name, description, and image
    const handleEdit = (field) => {
      if (field === 'name') {
        const newName = prompt("Enter new restaurant name", restaurantName);
        if (newName) setRestaurantName(newName);
      }
      if (field === 'description') {
        const newDescription = prompt("Enter new description", restaurantDescription);
        if (newDescription) setRestaurantDescription(newDescription);
      }
      if (field === 'image') {
        const newImage = prompt("Enter new image URL", restaurantImage);
        if (newImage) restaurantImage(newImage);
      }
    };

    // Handle adding a new reservation
    const handleAddReservation = () => {
        setCurrentReservation({
            id: reservations.length + 1,
            reservedTime: '',
            reserveHours: '',
            customerName: '',
            customerMobile: '',
            tableNo: '',
            paymentStatus: '',
            reservationStatus: ''
        });
        setShowModal(true);
    };

    // Handle reservation form changes (add/edit)
    const handleFormChange = (field, value) => {
        setCurrentReservation({
            ...currentReservation,
            [field]: value
        });
    };

    // Handle save for add or edit
    const handleSaveReservation = () => {
        if (currentReservation.id) {
            setReservations(reservations.map(reservation =>
                reservation.id === currentReservation.id ? currentReservation : reservation
            ));
        } else {
            setReservations([...reservations, { ...currentReservation, id: reservations.length + 1 }]);
        }
        setShowModal(false);
    };

     // Handle deleting a reservation
     const handleDeleteReservation = (id) => {
        setReservations(reservations.filter(res => res.id !== id));
    };

    // Handle facilities addition
    const handleAddFacility = () => {
      const newFacility = prompt("Enter new facility");
      if (newFacility && !facilities.includes(newFacility)) {
        setFacilities([...facilities, newFacility]);
      }
    };

    // Handle operating hours update
    const handleOperatingHoursChange = (time, value) => {
      setOperatingHours({ ...operatingHours, [time]: value });
    };

    // Switch between tabs
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

     // Handle image upload for menu items
     const handleMenuItemUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setMenuItems([...menuItems, imageUrl]); // Add the new image to the menuItems array
        }
      };
  

    return (
      <div className="restaurant-profile">
        {/* Header Section */}
        <header className="header">
          <div className="logo">ReserveMate</div>
          <div className="nav">
            <ul>
              <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>Profile</li>
              <li className={activeTab === 'reservation' ? 'active' : ''} onClick={() => handleTabChange('reservation')}>Reservation</li>
              <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => handleTabChange('analytics')}>Analytics</li>
              <li className={activeTab === 'payments' ? 'active' : ''} onClick={() => handleTabChange('payments')}>Payments</li>
              <li className={activeTab === 'ads' ? 'active' : ''} onClick={() => handleTabChange('ads')}>Ads</li>
            </ul>
          </div>
        </header>

        {/* Profile Section for Restaurant Profile */}
        <div className="profile-section">
          {activeTab === 'profile' && (
            <div className="restaurant-container">
              <div className="left-container">
                {/* Restaurant Name */}
                <div className="restaurant-name">
                  <h1>{restaurantName}</h1>
                  <button className="edit-button" onClick={() => handleEdit('name')}>Edit</button>
                </div>

                {/* Restaurant Description */}
                <div className="restaurant-description">
                  <h2>Restaurant Description</h2>
                  <p>{restaurantDescription}</p>
                  <button className="edit-button" onClick={() => handleEdit('description')}>Edit</button>
                </div>

                {/* Menu Section for Menu Item Upload */}
                <div className="menu-items">
                  <h2>Menu Items</h2>
                  <div className="menu-images">
                    {menuItems.map((image, index) => (
                      <div key={index} className="menu-item">
                        <img src={image} alt={`Menu Item ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <input type="file" accept="image/*" onChange={handleMenuItemUpload} />
                  <button className="edit-button">Upload Menu Item Image</button>
                </div>

                {/* Facilities */}
                <div className="facilities">
                  <h2>Facilities</h2>
                  <ul>
                    {facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                  <button className="edit-button" onClick={handleAddFacility}>Add Facility</button>
                </div>

                {/* Operating Hours */}
                <div className="operating-hours">
                  <h2>Operating Hours</h2>
                  <div>
                    <label>Open: </label>
                    <input
                      type="time"
                      value={operatingHours.open}
                      onChange={(e) => handleOperatingHoursChange('open', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Close: </label>
                    <input
                      type="time"
                      value={operatingHours.close}
                      onChange={(e) => handleOperatingHoursChange('close', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Container for Image */}
              <div className="right-container">
                <div className="restaurant-image-container">
                  <img src={restaurantImage} alt="Restaurant" className="restaurant-image" />
                  <button className="edit-button" onClick={() => handleEdit('image')}>Edit</button>
                </div>
              </div>
            </div>
          )}

          {/* Other sections like reservation, facilities, reviews... */}
        {/* Reservation Tab */}
        {activeTab === 'reservation' && (
                    <div className="reservation-section">
                        <h2>Reservations</h2>
                        <button onClick={handleAddReservation} className="edit-button">Add Reservation</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Reserved Time</th>
                                    <th>Reserve Hours</th>
                                    <th>Customer Name</th>
                                    <th>Customer Mobile</th>
                                    <th>Table No</th>
                                    <th>Payment Status</th>
                                    <th>Reservation Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(reservation => (
                                    <tr key={reservation.id}>
                                        <td>{reservation.id}</td>
                                        <td>{reservation.reservedTime}</td>
                                        <td>{reservation.reserveHours}</td>
                                        <td>{reservation.customerName}</td>
                                        <td>{reservation.customerMobile}</td>
                                        <td>{reservation.tableNo}</td>
                                        <td>{reservation.paymentStatus}</td>
                                        <td>{reservation.reservationStatus}</td>
                                        <td>
                                            <button onClick={() => {
                                                setCurrentReservation(reservation);
                                                setShowModal(true);
                                            }}>Edit</button>
                                            <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal for Add/Edit Reservation */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>{currentReservation?.id ? 'Edit Reservation' : 'Add Reservation'}</h3>
                            <label>Reserved Time:</label>
                            <input
                                type="text"
                                value={currentReservation?.reservedTime}
                                onChange={(e) => handleFormChange('reservedTime', e.target.value)}
                            />
                            <label>Reserve Hours:</label>
                            <input
                                type="text"
                                value={currentReservation?.reserveHours}
                                onChange={(e) => handleFormChange('reserveHours', e.target.value)}
                            />
                            <label>Customer Name:</label>
                            <input
                                type="text"
                                value={currentReservation?.customerName}
                                onChange={(e) => handleFormChange('customerName', e.target.value)}
                            />
                            <label>Customer Mobile:</label>
                            <input
                                type="text"
                                value={currentReservation?.customerMobile}
                                onChange={(e) => handleFormChange('customerMobile', e.target.value)}
                            />
                            <label>Table No:</label>
                            <input
                                type="text"
                                value={currentReservation?.tableNo}
                                onChange={(e) => handleFormChange('tableNo', e.target.value)}
                            />
                            <label>Payment Status:</label>
                            <input
                                type="text"
                                value={currentReservation?.paymentStatus}
                                onChange={(e) => handleFormChange('paymentStatus', e.target.value)}
                            />
                            <label>Reservation Status:</label>
                            <input
                                type="text"
                                value={currentReservation?.reservationStatus}
                                onChange={(e) => handleFormChange('reservationStatus', e.target.value)}
                            />
                            <button onClick={handleSaveReservation}>
                                {currentReservation?.id ? 'Save Changes' : 'Add Reservation'}
                            </button>
                            <button onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantProfile;