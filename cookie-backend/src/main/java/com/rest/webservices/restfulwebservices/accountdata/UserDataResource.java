package com.rest.webservices.restfulwebservices.accountdata;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rest.webservices.restfulwebservices.jwt.JwtInMemoryUserDetailsService;
import com.rest.webservices.restfulwebservices.node.ItemNode;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserDataResource
{
	
	@Autowired
	private UserDetailsJpaRepository userDetailsRepository;
	
	@Autowired
	private JwtInMemoryUserDetailsService jwtInMemoryUserDetailsService;
	
	@PostMapping("/jpa/users/{username}/account-details/add")
	public ResponseEntity<ItemNode> addUserAccountData(@PathVariable String username, @RequestBody String userDetails)
	{	
		UserDetailsNode newNode;
		String[] detailArray = userDetails.split("_");
		
		if(detailArray.length == 6)
		{
			String fullName = detailArray[0];
			String address = detailArray[1];
			String city = detailArray[2];
			String state = detailArray[3];
			String zipCode = detailArray[4];
			String cardNum = detailArray[5];
			
			Long id = jwtInMemoryUserDetailsService.loadUserByUsername(username).getId();
			
			newNode = new UserDetailsNode(id, username, fullName, address, city, state, zipCode, cardNum);
			
			userDetailsRepository.save(newNode);
		}
		else
		{
			newNode = new UserDetailsNode(0L, username, "", "", "", "", "", "");
		}
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newNode.getUsername())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/jpa/users/{username}/account-details/get-account-details")
	public UserDetailsNode getAccountDetails(@PathVariable String username)
	{
		UserDetailsNode thisNode;
		
		List<UserDetailsNode> nodeList = userDetailsRepository.findByUsername(username);

		if(nodeList.isEmpty())
		{
			thisNode = new UserDetailsNode(0L, username, "", "", "", "", "", "");
		}
		else 
		{
			thisNode = nodeList.get(nodeList.size() - 1);
		}
		
		return thisNode;

	}
	
}
