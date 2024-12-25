package com.reservemate.ReserveMate_backend.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reservemate.ReserveMate_backend.user.User;
import com.reservemate.ReserveMate_backend.user.UserRepository;
import com.reservemate.ReserveMate_backend.user.UserService;

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
	
	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
	
	@Override
	public Customer findById(long id) {
		return customerRepository.findById(id);
	}
	 
        
       

	
	}

	
	




