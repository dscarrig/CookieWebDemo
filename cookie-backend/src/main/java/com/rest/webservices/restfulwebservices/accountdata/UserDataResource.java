package com.rest.webservices.restfulwebservices.accountdata;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rest.webservices.restfulwebservices.node.ItemNode;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserDataResource
{
	
	@Autowired
	private UserDataUtils userDataUtils;
	
	@Autowired
	private UserDetailsJpaRepository userDetailsRepository;
	
	@PostMapping("/jpa/users/{username}/account-details/add")
	public ResponseEntity<ItemNode> addUserAccountData(@PathVariable String username, @RequestBody String userDetails)
	{
		String[] detailArray = userDetails.split("_");
		String address = detailArray[0];
		String city = detailArray[1];
		String state = detailArray[2];
		String zipCode = detailArray[3];
		String cardNum = detailArray[4];
		
		UserDetailsNode newNode = new UserDetailsNode(username, address, city, state, zipCode, cardNum);
		
		userDetailsRepository.save(newNode);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newNode.getUsername())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
	
}
