package com.reservemate.ReserveMate_backend.auth;

import java.util.Collection;
import java.util.List;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.reservemate.ReserveMate_backend.user.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CustomAuthUser implements UserDetails {
	
	private long id;

	private String email;

	private String password;
	
	private String name;

	private String mobile;
	
	private String picture;
	
	private String role;

	private String district;

	private String city;
	
	public CustomAuthUser() {
		super();
	}
	
	public CustomAuthUser(User user) {
		this.name=user.getName();
		this.id=user.getId();
		this.mobile=user.getMobile();
		this.password=user.getPassword();
		this.email=user.getEmail();
		this.role=user.getRole();
		this.district=user.getDistrict();
		this.city=user.getCity();

	}
	
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
	

	
	

}
