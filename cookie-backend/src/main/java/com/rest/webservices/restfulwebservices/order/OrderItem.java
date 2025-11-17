package com.rest.webservices.restfulwebservices.order;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rest.webservices.restfulwebservices.node.ItemNode;

@Entity
@Table(name = "order_items")
public class OrderItem
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	@JsonIgnore
	private Order order;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "item_id", nullable = false)
	private ItemNode item;

	@Column(name = "quantity")
	private int quantity;

	@Column(name = "item_price")
	private double itemPrice; // Snapshot of price at order time

	protected OrderItem()
	{

	}

	public OrderItem(Long id, Order order, ItemNode item, int quantity, double itemPrice)
	{
		super();
		this.id = id;
		this.order = order;
		this.item = item;
		this.quantity = quantity;
		this.itemPrice = itemPrice;
	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public Order getOrder()
	{
		return order;
	}

	public void setOrder(Order order)
	{
		this.order = order;
	}

	public ItemNode getItem()
	{
		return item;
	}

	public void setItem(ItemNode item)
	{
		this.item = item;
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
		OrderItem other = (OrderItem) obj;
		if (id == null)
		{
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
