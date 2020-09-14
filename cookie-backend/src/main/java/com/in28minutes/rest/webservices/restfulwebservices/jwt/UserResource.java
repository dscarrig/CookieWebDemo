package com.in28minutes.rest.webservices.restfulwebservices.jwt;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.in28minutes.rest.webservices.restfulwebservices.helloworld.AuthenticationBean;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserResource
{
	@Autowired
	JwtInMemoryUserDetailsService userDetailsService;

	@Autowired
	BCryptPasswordEncoder encoder;

	@GetMapping("/users/{id}")
	public UserDetails getUser(@PathVariable Long id)
	{
		System.out.println("Finding user with id: " + id);
		return userDetailsService.loadUserById(id);
	}

	@PostMapping("/users/new/{username}")
	public ResponseEntity<Void> createUser(@PathVariable String username, @RequestBody String password)
	{
		String encodedString = "";
		JwtUserDetails createdUser = null;

		for (int i = 0; i < 10; i++)
			encodedString = encoder.encode(password);

		if(!userDetailsService.userExists(username))
			createdUser = userDetailsService.addUser(username, encodedString);
		else
			createdUser = userDetailsService.addUser("", "");

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}
