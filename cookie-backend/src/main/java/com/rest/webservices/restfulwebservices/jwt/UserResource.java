package com.rest.webservices.restfulwebservices.jwt;

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

	@GetMapping("/users/exists/{username}")
	public boolean userExists(@PathVariable String username)
	{
		boolean response;

		if (userDetailsService.userExists(username))
			response = true;
		else
			response = false;

		return response;
	}

	@PostMapping("/users/new/{username}")
	public ResponseEntity<Void> createUser(@PathVariable String username, @RequestBody String password)
	{
		String encodedString = encoder.encode(password);
		JwtUserDetails createdUser = null;

		if (!userDetailsService.userExists(username))
			createdUser = userDetailsService.addUser(username, encodedString);
		else
			createdUser = userDetailsService.addUser("", "");

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}
