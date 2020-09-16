package com.rest.webservices.restfulwebservices.helloworld;

public class MessageBean
{
	private String message;

	public MessageBean(String m)
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
		return "Message [message=" + message + "]";
	}
}
