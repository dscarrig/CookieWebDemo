package com.rest.webservices.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rest.webservices.restfulwebservices.helloworld.AuthenticationBean;

// Controller
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BasicAuthenticationController
{
	@GetMapping(path = "/basicauth")
	public AuthenticationBean hellowWorldBean()
	{
		return new AuthenticationBean("You are authenticated, Baby");
	}

}
