package com.rest.webservices.restfulwebservices.accountdata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDataUtils
{
	
	@Autowired
	private UserDetailsJpaRepository userDetailsRepository;

	public void addUserData(String username, String userDetails)
	{
		String[] detailArray = userDetails.split("_");
		String address = detailArray[0];
		String city = detailArray[1];
		String state = detailArray[2];
		String zipCode = detailArray[3];
		String cardNum = detailArray[4];
		
		UserDetailsNode newNode = new UserDetailsNode(username, address, city, state, zipCode, cardNum);
		
		userDetailsRepository.save(newNode);
		
	}
	
}
