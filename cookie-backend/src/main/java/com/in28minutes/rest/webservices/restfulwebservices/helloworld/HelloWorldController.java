package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.rest.webservices.restfulwebservices.helloworld.AuthenticationBean;

// Controller
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HelloWorldController
{
	// method for return "Hello World"
	@GetMapping(path = "/hello-world")
	public String hellowWorld()
	{
		return "Hello World, Baby";
	}

	// hello-world-bean
	@GetMapping(path = "/hello-world-bean")
	public AuthenticationBean hellowWorldBean()
	{
		return new AuthenticationBean("Hello Breakfast, Baby");
		// throw new RuntimeException("Big time bad error");
	}

	@GetMapping(path = "/hello-world/path-variable/{name}")
	public AuthenticationBean hellowWorldBean(@PathVariable String name)
	{
		return new AuthenticationBean(String.format("Greetings, %s", name));
	}

}
