package com.rest.webservices.restfulwebservices.helloworld;

public class AuthenticationBean
{
	private String message;

	public AuthenticationBean(String m)
	{
		message = m;
	}

	public void setMessage(String m)
	{
		message = m;
	}

	public String getMessage()
	{
		return message;
	}

	@Override
	public String toString()
	{
		return "HelloWorldBean [message=" + message + "]";
	}
}
