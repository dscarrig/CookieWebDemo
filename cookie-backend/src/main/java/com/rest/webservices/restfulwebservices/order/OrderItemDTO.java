package com.rest.webservices.restfulwebservices.order;

public class OrderItemDTO
{
	private Long itemId;
	private String itemName;
	private int quantity;
	private double itemPrice;

	public OrderItemDTO()
	{

	}

	public OrderItemDTO(Long itemId, String itemName, int quantity, double itemPrice)
	{
		this.itemId = itemId;
		this.itemName = itemName;
		this.quantity = quantity;
		this.itemPrice = itemPrice;
	}

	public Long getItemId()
	{
		return itemId;
	}

	public void setItemId(Long itemId)
	{
		this.itemId = itemId;
	}

	public String getItemName()
	{
		return itemName;
	}

	public void setItemName(String itemName)
	{
		this.itemName = itemName;
	}

	public int getQuantity()
	{
		return quantity;
	}

	public void setQuantity(int quantity)
	{
		this.quantity = quantity;
	}

	public double getItemPrice()
	{
		return itemPrice;
	}

	public void setItemPrice(double itemPrice)
	{
		this.itemPrice = itemPrice;
	}

	public double getSubtotal()
	{
		return itemPrice * quantity;
	}
}
