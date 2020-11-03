package com.rest.webservices.restfulwebservices.jwt;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User
{
	@Id
	@GeneratedValue
	private Long id;
	
	private String userName;
	private String password;
	
	protected User()
	{
		
	}
	
	public User(Long id, String userName, String password)
	{
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
	}
	
	public Long getId()
	{
		return id;
	}
	public void setId(Long id)
	{
		this.id = id;
	}
	public String getUserName()
	{
		return userName;
	}
	public void setUserName(String userName)
	{
		this.userName = userName;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	
	
}
