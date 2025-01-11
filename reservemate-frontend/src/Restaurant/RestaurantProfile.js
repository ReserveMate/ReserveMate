
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantService from '../Services/RestaurantService';
//import 'bootstrap/dist/css/bootstrap.min.css';
import defaultRestaurantImage from '../assets/restaurant-image.jpg'; // Import the default image

const RestaurantProfile = ({ token }) => {


    const [restaurantName, setRestaurantName] = useState("Bubby's");
    const [restaurantDescription, setRestaurantDescription] = useState(
        "Bubby’s opened on Thanksgiving Day 1990. Chef / Owner Ron Silver began baking pies and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St. in Tribeca. Today, NYC’s beloved restaurant and pie shop celebrates 27 years of classic, made-from-scratch American cooking."
    );
    const [restaurantImage, setRestaurantImage] = useState(defaultRestaurantImage);

    const [menuItems, setMenuItems] = useState([]);
    const [facilities, setFacilities] = useState(["Wi-Fi", "Parking", "Outdoor Seating"]);
    const [operatingHours, setOperatingHours] = useState("10:00 AM - 10:00 PM");
    const [activeTab, setActiveTab] = useState('profile');
    const [reservations, setReservations] = useState([
        {
            id: 1,
            reservedTime: "2025-01-10 6:00 PM",
            reserveHours: 2,
            customerName: "John Doe",
            customerMobile: "1234567890",
            tableNo: 1,
            paymentStatus: "Paid",
            reservationStatus: "Confirmed"
        },
        {
            id: 2,
            reservedTime: "2025-01-11 7:00 PM",
            reserveHours: 3,
            customerName: "Jane Smith",
            customerMobile: "9876543210",
            tableNo: 2,
            paymentStatus: "Pending",
            reservationStatus: "Pending"
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);
    const [tables, setTables] = useState([
        {
            id: 1,
            type: "Standard Table",
            visitors: 4,
            cost: 200,
            description: "Standard table for four.",
            reserved: false,
            image: defaultRestaurantImage,
        },
    ]);

    const handleEdit = (field) => {
        if (field === 'name') {
            const newName = prompt("Enter new restaurant name", restaurantName);
            if (newName) setRestaurantName(newName);
        }
        if (field === 'description') {
            const newDescription = prompt("Enter new description", restaurantDescription);
            if (newDescription) setRestaurantDescription(newDescription);
        }
        if (field === 'hours') {
            const newHours = prompt("Enter new operating hours", operatingHours);
            if (newHours) setOperatingHours(newHours);
        }
    };



    const handleAddFacility = () => {
        const newFacility = prompt("Enter new facility");
        if (newFacility && !facilities.includes(newFacility)) {
            setFacilities([...facilities, newFacility]);
        }
    };

    const handleDeleteFacility = (facility) => {
        setFacilities(facilities.filter(f => f !== facility));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleImageUploadForTable = (index) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                const updatedTables = [...tables];
                updatedTables[index] = { ...updatedTables[index], image: imageUrl };
                setTables(updatedTables);
            }
        };

        fileInput.click();
    };



    const handleAddReservation = () => {
        const newReservation = {
            id: reservations.length + 1,
            reservedTime: "",
            reserveHours: "",
            customerName: "",
            customerMobile: "",
            tableNo: "",
            paymentStatus: "",
            reservationStatus: ""
        };
        setReservations([...reservations, newReservation]);
        setCurrentReservation(newReservation);
        setShowModal(true);
    };

    const handleSaveTablesToDatabase = () => {
        console.log("Saving tables to database:", tables);
        alert("Tables saved successfully!");
    };


    const handleSaveReservation = () => {
        const updatedReservations = reservations.map((res) =>
            res.id === currentReservation.id ? currentReservation : res
        );
        setReservations(updatedReservations);
        setCurrentReservation(null);
        setShowModal(false);
    };

    const handleDeleteReservation = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
    };

    const handleAddTable = () => {
        const newTable = {
            id: tables.length + 1,
            type: "Table",
            visitors: 0,
            cost: 0,
            description: "",
            reserved: false,
            image: defaultRestaurantImage,
        };
        setTables([...tables, newTable]);
    };

    const handleEditTable = (id) => {
        const table = tables.find(t => t.id === id);
        if (table) {
            const updatedTable = {
                ...table,
                type: prompt("Enter table type", table.type) || table.type,
                visitors: parseInt(prompt("Enter number of visitors", table.visitors), 10) || table.visitors,
                cost: parseInt(prompt("Enter reservation cost", table.cost), 10) || table.cost,
                description: prompt("Enter description", table.description) || table.description,
            };
            setTables(tables.map(t => (t.id === id ? updatedTable : t)));
        }
    };

    const handleDeleteTable = (id) => {
        setTables(tables.filter(t => t.id !== id));
    };

    const toggleTableAvailability = (id) => {
        setTables(tables.map(t => (t.id === id ? { ...t, reserved: !t.reserved } : t)));
    };





    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        description: '',
        operatingHours: '',
        city: '',
        district: '',
        mobile: '',
        picture: null,
        menuPicture: null,
    });

    useEffect(() => {
        const fetchRestaurantInfo = async () => {
            try {
                const response = await axios.get(`${RestaurantService.BASE_URL}/restaurant/profile/info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRestaurantInfo(response.data.user);
                setFormData({
                    email: response.data.user.email,
                    name: response.data.user.name,
                    description: response.data.user.description,
                    operatingHours: response.data.user.operationHours,
                    city: response.data.user.city,
                    district: response.data.user.district,
                    mobile: response.data.user.mobile,
                    picture: null,
                    menuPicture: null,
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRestaurantInfo();
    }, [token]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        setFormData({
            ...formData,
            picture: e.target.files[0],
        });
    };

    const handleMenuImageUpload = (e) => {
        setFormData({
            ...formData,
            menuPicture: e.target.files[0],
        });
    };

    const handleSaveToDatabase = async () => {
        try {
            const updatedData = new FormData();
            Object.keys(formData).forEach(key => {
                updatedData.append(key, formData[key]);
            });

            const response = await axios.put(`${RestaurantService.BASE_URL}/restaurant/update/${restaurantInfo.id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert(response.data.message);
            setEditMode(false);
            setRestaurantInfo(response.data.user);
        } catch (err) {
            console.error(err);
        }
    };

    //   const toggleEditMode = () => {
    //     setEditMode(!editMode);
    //   };

    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }


    return (
        <div className="container-fluid">

            <div className="mt-5 pt-5">
                <ul className="nav nav-tabs nav-justified" style={{ fontSize: '20px', backgroundColor: '#dc3545' }}>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('profile')} style={{ color: activeTab === 'profile' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'profile' ? '#bd2130' : '' }}>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'reservation' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('reservation')} style={{ color: activeTab === 'reservation' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'reservation' ? '#bd2130' : '' }}>Reservations</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'tables' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('tables')} style={{ color: activeTab === 'tables' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'tables' ? '#bd2130' : '' }}>Tables</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('payments')} style={{ color: activeTab === 'payments' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'payments' ? '#bd2130' : '' }}>Payments</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'ads' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('ads')} style={{ color: activeTab === 'ads' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'ads' ? '#bd2130' : '' }}>Ads</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} href="#" onClick={() => handleTabChange('analytics')} style={{ color: activeTab === 'analytics' ? 'white' : '#f8f9fa', backgroundColor: activeTab === 'analytics' ? '#bd2130' : '' }}>Analytics</a>
                    </li>
                </ul>

                <div className="tab-content mt-4">
                    {activeTab === 'profile' && (
                        <div className="row">
                            {/* Profile Information Section */}
                            <div className="col-md-6">
                                <h1>{restaurantName}</h1>
                                <p>{restaurantDescription}</p>

                                <div className="d-flex align-items-center mb-3">
                                    <button className="btn btn-danger" onClick={() => handleEdit('name')}>Edit Name</button>
                                    <button className="btn btn-danger ms-2" onClick={() => handleEdit('description')}>Edit Description</button>
                                </div>

                                {/* Operating Hours */}
                                <div className="mt-4">
                                    <h5>Operating Hours</h5>
                                    <p>{operatingHours}</p>
                                    <button className="btn btn-danger" onClick={() => handleEdit('hours')}>Edit Operating Hours</button>
                                </div>

                                {/* Facilities Section */}
                                <div className="mt-4">
                                    <h5>Facilities</h5>
                                    <ul className="list-group">
                                        {facilities.map((facility, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{facility}</span>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteFacility(facility)}>X</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-danger mt-3" onClick={handleAddFacility}>Add Facility</button>
                                </div>

                                {/* Profile Edit and Save */}
                                <div className="mt-4">
                                    <button className="btn btn-success" onClick={handleSaveToDatabase}>Save All Changes</button>
                                </div>
                            </div>

                            {/* Image and Menu Section */}
                            <div className="col-md-6 text-center">
                                {/* Profile Picture */}
                                <div className="mb-4">
                                    <img
                                        src={restaurantImage}
                                        alt="Restaurant"
                                        className="img-fluid rounded mb-3"
                                        style={{ height: '100%', maxHeight: '500px', objectFit: 'cover', width: '100%' }}
                                    />
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => document.getElementById('imageUpload').click()}
                                    >
                                        Change Profile Picture
                                    </button>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="d-none"
                                    />
                                </div>

                                {/* Menu Picture */}
                                {/* <div className="mb-4">
                    <img
                        src={menuImage || "placeholder-image-url"} // Replace with default placeholder if `menuImage` is not set
                        alt="Menu"
                        className="img-fluid rounded mb-3"
                        style={{ height: '100%', maxHeight: '500px', objectFit: 'cover', width: '100%' }}
                    />
                    <button
                        className="btn btn-danger"
                        onClick={() => document.getElementById('menuImageUpload').click()}
                    >
                        Change Menu Picture
                    </button>
                    <input
                        type="file"
                        id="menuImageUpload"
                        accept="image/*"
                        onChange={handleMenuImageUpload}
                        className="d-none"
                    />
                </div> */}
                            </div>

                            {/* Edit Profile Form (Toggle via state) */}
                            {editMode && (
                                <div className="col-12 mt-4">
                                    <h3>Edit Profile</h3>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Operating Hours</label>
                                                <input
                                                    type="text"
                                                    name="operatingHours"
                                                    value={formData.operatingHours}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>District</label>
                                                <input
                                                    type="text"
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Mobile</label>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleSaveToDatabase}
                                        >
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'reservation' && (
                        <div>
                            <h2>Reservations</h2>
                            <button className="btn btn-danger mb-3" onClick={handleAddReservation}>Add Reservation</button>
                            <table className="table table-hover">
                                <thead className="table-danger">
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
                                                <button className="btn btn-sm btn-primary me-2" onClick={() => { setCurrentReservation(reservation); setShowModal(true); }}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'tables' && (
                        <div>
                            <h2>Tables</h2>
                            <button className="btn btn-success mb-3" onClick={handleAddTable}>Add New Table</button>
                            <div className="row">
                                {tables.map((table, index) => (
                                    <div key={index} className="col-md-3"> {/* Made table smaller by changing column size */}
                                        <div className="card mb-3">
                                            <img src={table.image || defaultRestaurantImage} className="card-img-top" alt="Table" />
                                            <div className="card-body">
                                                <h5 className="card-title">Type: {table.type}</h5>
                                                <p className="card-text">ID: {table.id}</p>
                                                <p className="card-text">Visitors: {table.visitors}</p>
                                                <p className="card-text">Cost: {table.cost}</p>
                                                <p className="card-text">Description: {table.description}</p>
                                                <p className="card-text">Status: {table.reserved ? 'Reserved' : 'Available'}</p>
                                                <button className="btn btn-sm btn-danger me-2" onClick={() => handleEditTable(table.id)}>Edit</button>
                                                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDeleteTable(table.id)}>Delete</button>
                                                <button className="btn btn-sm btn-danger me-2" onClick={() => toggleTableAvailability(table.id)}>
                                                    {table.reserved ? 'Mark as Available' : 'Mark as Reserved'}
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleImageUploadForTable(index)}>Change Image</button>
                                                <p></p>
                                                <button className="btn btn-sm btn-success" onClick={handleSaveTablesToDatabase}>Save Table</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>


            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentReservation?.id ? 'Edit Reservation' : 'Add Reservation'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="reservedTime" className="form-label">Reserved Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reservedTime"
                                            value={currentReservation?.reservedTime || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    reservedTime: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reserveHours" className="form-label">Reserve Hours</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="reserveHours"
                                            value={currentReservation?.reserveHours || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    reserveHours: parseInt(e.target.value, 10),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerName"
                                            value={currentReservation?.customerName || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    customerName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="customerMobile" className="form-label">Customer Mobile</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerMobile"
                                            value={currentReservation?.customerMobile || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    customerMobile: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tableNo" className="form-label">Table No</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="tableNo"
                                            value={currentReservation?.tableNo || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    tableNo: parseInt(e.target.value, 10),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="paymentStatus" className="form-label">Payment Status</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="paymentStatus"
                                            value={currentReservation?.paymentStatus || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    paymentStatus: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reservationStatus" className="form-label">Reservation Status</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reservationStatus"
                                            value={currentReservation?.reservationStatus || ''}
                                            onChange={(e) =>
                                                setCurrentReservation({
                                                    ...currentReservation,
                                                    reservationStatus: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const updatedReservations = reservations.map((res) =>
                                            res.id === currentReservation.id ? currentReservation : res
                                        );
                                        setReservations(updatedReservations);
                                        setCurrentReservation(null);
                                        setShowModal(false);
                                    }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantProfile;