package com.rest.webservices.restfulwebservices.node;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ItemNode
{
	@Id
	@GeneratedValue
	private Long id;
	
	private String itemName;
	private String description;
	private double price;
	private String picture;

	protected ItemNode()
	{

	}

	

	public ItemNode(Long id, String itemName, String description, double price, String picture)
	{
		super();
		this.id = id;
		this.itemName = itemName;
		this.description = description;
		this.price = price;
		this.picture = picture;
	}



	public Long getId()
	{
		return id;
	}



	public void setId(Long id)
	{
		this.id = id;
	}



	public String getItemName()
	{
		return itemName;
	}



	public void setItemName(String itemName)
	{
		this.itemName = itemName;
	}



	public String getDescription()
	{
		return description;
	}



	public void setDescription(String description)
	{
		this.description = description;
	}



	public double getPrice()
	{
		return price;
	}



	public void setPrice(double price)
	{
		this.price = price;
	}



	public String getPicture()
	{
		return picture;
	}



	public void setPicture(String picture)
	{
		this.picture = picture;
	}



	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(id);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemNode other = (ItemNode) obj;
		if (Double.doubleToLongBits(id) != Double.doubleToLongBits(other.id))
			return false;
		return true;
	}
}
