package com.rest.webservices.restfulwebservices.accountdata;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserDetailsNode
{
	@Id
	@GeneratedValue
	private Long id;

	private String username;
	private String fullName;
	private String address;
	private String addressTwo;
	private String city;
	private String state;
	private String zipCode;
	private String cardNum;

	protected UserDetailsNode()
	{

	}

	public UserDetailsNode(Long id, String username, String fullName, String address, String addressTwo, String city, String state,
			String zipCode, String cardNum)
	{
		super();
		this.id = id;
		this.username = username;
		this.fullName = fullName;
		this.address = address;
		this.addressTwo = addressTwo;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.cardNum = cardNum;

	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getFullName()
	{
		return fullName;
	}

	public void setFullName(String fullName)
	{
		this.fullName = fullName;
	}

	public String getAddress()
	{
		return address;
	}

	public void setAddress(String address)
	{
		this.address = address;
	}

	public String getAddressTwo()
	{
		return addressTwo;
	}

	public void setAddressTwo(String addressTwo)
	{
		this.addressTwo = addressTwo;
	}

	public String getCity()
	{
		return city;
	}

	public void setCity(String city)
	{
		this.city = city;
	}

	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
	}

	public String getZipCode()
	{
		return zipCode;
	}

	public void setZipCode(String zipCode)
	{
		this.zipCode = zipCode;
	}

	public String getCardNum()
	{
		return cardNum;
	}

	public void setCardNum(String cardNum)
	{
		this.cardNum = cardNum;
	}

}
