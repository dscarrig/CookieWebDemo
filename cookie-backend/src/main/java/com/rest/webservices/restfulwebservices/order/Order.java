package com.rest.webservices.restfulwebservices.order;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rest.webservices.restfulwebservices.jwt.User;

@Entity
@Table(name = "orders")
public class Order
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;

	@Column(name = "order_date")
	private LocalDateTime date;

	@Column(name = "status")
	private String status; // e.g., "PENDING", "COMPLETED", "CANCELLED", "SHIPPED"

	@Column(name = "total")
	private double total;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems = new ArrayList<>();

	public Order()
	{

	}

	public Order(Long id, User user, LocalDateTime date, String status, double total)
	{
		super();
		this.id = id;
		this.user = user;
		this.date = date;
		this.status = status;
		this.total = total;
	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
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

	public List<OrderItem> getOrderItems()
	{
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems)
	{
		this.orderItems = orderItems;
	}

	public void addOrderItem(OrderItem item)
	{
		orderItems.add(item);
		item.setOrder(this);
	}

	public void removeOrderItem(OrderItem item)
	{
		orderItems.remove(item);
		item.setOrder(null);
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Order other = (Order) obj;
		if (id == null)
		{
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
