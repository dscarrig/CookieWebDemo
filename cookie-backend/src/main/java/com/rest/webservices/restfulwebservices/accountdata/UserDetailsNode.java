package com.rest.webservices.restfulwebservices.accountdata;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "user_details_node")
public class UserDetailsNode
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	private String username;
	private String fullName;
	private String address;
	private String addressTwo;
	private String city;
	private String state;
	private String zipCode;
	private String cardNum;
	private boolean isDefault;

	protected UserDetailsNode()
	{

	}

	public UserDetailsNode(Long id, String username, String fullName, String address, String addressTwo, String city, String state,
			String zipCode, String cardNum, boolean isDefault)
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
		this.isDefault = isDefault;

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

	public boolean getIsDefault()
	{
		return isDefault;
	}

	public void setIsDefault(boolean isDefault)
	{
		this.isDefault = isDefault;
	}

}
