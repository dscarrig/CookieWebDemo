package com.rest.webservices.restfulwebservices.jwt;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import com.rest.webservices.restfulwebservices.order.Order;

@Entity
@Table(name = "app_user")
public class User
{
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(unique = true)
	private String userName;
	private String password;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
	
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
	
	public List<Order> getOrders()
	{
		return orders;
	}
	
	public void setOrders(List<Order> orders)
	{
		this.orders = orders;
	}
	
	public void addOrder(Order order)
	{
		orders.add(order);
		order.setUser(this);
	}
	
	public void removeOrder(Order order)
	{
		orders.remove(order);
		order.setUser(null);
	}
	
	
}
