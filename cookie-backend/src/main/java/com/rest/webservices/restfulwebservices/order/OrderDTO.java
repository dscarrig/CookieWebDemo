package com.rest.webservices.restfulwebservices.order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO
{
	private Long id;
	private String username;
	private LocalDateTime date;
	private String status;
	private double total;
	private List<OrderItemDTO> items;

	public OrderDTO()
	{

	}

	public OrderDTO(Long id, String username, LocalDateTime date, String status, double total, List<OrderItemDTO> items)
	{
		this.id = id;
		this.username = username;
		this.date = date;
		this.status = status;
		this.total = total;
		this.items = items;
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

	public LocalDateTime getDate()
	{
		return date;
	}

	public void setDate(LocalDateTime date)
	{
		this.date = date;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
	}

	public double getTotal()
	{
		return total;
	}

	public void setTotal(double total)
	{
		this.total = total;
	}

	public List<OrderItemDTO> getItems()
	{
		return items;
	}

	public void setItems(List<OrderItemDTO> items)
	{
		this.items = items;
	}
}
