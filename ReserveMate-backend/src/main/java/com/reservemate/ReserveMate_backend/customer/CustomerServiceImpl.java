package com.reservemate.ReserveMate_backend.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.user.User;
import com.reservemate.ReserveMate_backend.user.UserRepository;


@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerRepository customerRepository;

	public CustomerServiceImpl(UserRepository userRepository, CustomerRepository customerRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.customerRepository = customerRepository;
	}

	

	@Override
	public CustomerSignupDTO customerSignup(CustomerSignupDTO customerSignupRequest) {

		CustomerSignupDTO customerSignup = new CustomerSignupDTO();
		
		try {
			Customer customer = new Customer();
			customer.setEmail(customerSignupRequest.getEmail());
			customer.setCity(customerSignupRequest.getCity());
			customer.setDistrict(customerSignupRequest.getDistrict());
			customer.setMobile(customerSignupRequest.getMobile());
			customer.setPicture(customerSignupRequest.getPicture());
			customer.setRole("CUSTOMER");
			customer.setName(customerSignupRequest.getName());
			customer.setPassword(passwordEncoder.encode(customerSignupRequest.getPassword()));
			
			User usersResult = userRepository.save(customer);
			
			if (usersResult.getId() > 0) { 
				customerSignup.setUser((usersResult));
				customerSignup.setMessage("Signed Up Successfully");
				customerSignup.setStatusCode(200);
			}

		} catch (Exception e) {
			customerSignup.setStatusCode(500);
			customerSignup.setError(e.getMessage());
		}
		return customerSignup;

	}
	
	 public CustomerSignupDTO updatedCustomerProfile(Integer customerId, Customer updatedCustomerProfile) {
		 CustomerSignupDTO updateCustomerProfile = new CustomerSignupDTO();
	        try {
	        	
	            Optional<Customer> customerOptional = customerRepository.findById(customerId);
	            
	            if (customerOptional.isPresent()) {
	            	
	            	Customer existingCustomer = customerOptional.get();
	            	
	            	existingCustomer.setEmail(updatedCustomerProfile.getEmail());
	            	existingCustomer.setName(updatedCustomerProfile.getName());
	            	existingCustomer.setCity(updatedCustomerProfile.getCity());
	            	existingCustomer.setDistrict(updatedCustomerProfile.getDistrict());
	            	existingCustomer.setMobile(updatedCustomerProfile.getMobile());
	            	existingCustomer.setPicture(updatedCustomerProfile.getPicture());

	                // Check if password is present in the request
	                if (updatedCustomerProfile.getPassword() != null && !updatedCustomerProfile.getPassword().isEmpty()) {
	                    // Encode the password and update it
	                	existingCustomer.setPassword(passwordEncoder.encode(updatedCustomerProfile.getPassword()));
	                }

	                Customer savedCustomer = customerRepository.save(existingCustomer);
	                updateCustomerProfile.setUser(savedCustomer);
	                updateCustomerProfile.setStatusCode(200);
	                updateCustomerProfile.setMessage("Profile updated successfully");
	            } else {
	            	updateCustomerProfile.setStatusCode(404);
	            	updateCustomerProfile.setMessage("Profile not found for update");
	            }
	        } catch (Exception e) {
	        	updateCustomerProfile.setStatusCode(500);
	        	updateCustomerProfile.setMessage("Error occurred while updating user: " + e.getMessage());
	        }
	        return updateCustomerProfile;
	    }


	    public CustomerSignupDTO getCustomerInfo(String email){
	    	CustomerSignupDTO viewCustomerProfile = new CustomerSignupDTO();
	        try {
	        	
	            Optional<Customer> customerOptional = customerRepository.findByEmail(email);
	            
	            if (customerOptional.isPresent()) {
	            	viewCustomerProfile.setUser(customerOptional.get());
	            	viewCustomerProfile.setStatusCode(200);
	            	viewCustomerProfile.setMessage("successful");
	            } else {
	            	viewCustomerProfile.setStatusCode(404);
	            	viewCustomerProfile.setMessage("User not found for update");
	            }

	        }catch (Exception e){
	        	viewCustomerProfile.setStatusCode(500);
	        	viewCustomerProfile.setMessage("Error occurred while getting user info: " + e.getMessage());
	        }
	        return viewCustomerProfile;

	    }
	
	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
	
	@Override
	public Customer findById(long id) {
		return customerRepository.findById(id);
	}
	 
	
        
       

	
	}

	
	




