package com.reservemate.ReserveMate_backend.user;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
@DiscriminatorColumn(name = "User_Type")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;

	private String email;

	private String password;
	
	private String firstName;

	private String lastName;

	private String mobile;
	
	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	private List<Role> roles;
	
	@CreationTimestamp
	private LocalDateTime createDateTime;

	@UpdateTimestamp
	private LocalDateTime updatedDateTime;
	
	

}
