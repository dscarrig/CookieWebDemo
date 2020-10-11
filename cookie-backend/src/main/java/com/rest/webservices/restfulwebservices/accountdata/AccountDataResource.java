package com.rest.webservices.restfulwebservices.accountdata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rest.webservices.restfulwebservices.node.ItemNode;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AccountDataResource
{
	/*
	@Autowired
	private AccountDataUtils accountDataUtils;
	
	
	@PostMapping("/jpa/users/{username}/cart/add")
	public ResponseEntity<ItemNode> addUserAccountData(@PathVariable String address, @RequestBody Long creditCardNumber)
	{
		accountDataUtils.addItem(address, creditCardNumber);
		
		
		return new ResponseEntity<ItemNode>(HttpStatus.OK);
	}
	*/
}
