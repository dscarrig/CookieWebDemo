package com.rest.webservices.restfulwebservices.node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CartItemUtils {

	private HashMap<String, ArrayList<Long>> customerCarts = new HashMap<>();
	
	public List<Long> getUsersItems(String customer)
	{
		return customerCarts.get(customer);
	}
	
	public void addItem(String customer, Long itemId)
	{
		ArrayList<Long> currentItems;
		
		if(customerCarts.containsKey(customer))
			currentItems = customerCarts.get(customer);
		else
			currentItems = new ArrayList<Long>();
		
		currentItems.add(itemId);
		customerCarts.put(customer, currentItems);
		
		System.out.println("Added " + itemId + " item to " + customer);
	}
	
	public void removeItem(String customer, Long itemId)
	{
		ArrayList<Long> currentItems = customerCarts.get(customer);
		currentItems.remove(itemId);
		customerCarts.put(customer, currentItems);
	}
	
	public void clearItems(String customer)
	{
		customerCarts.put(customer, new ArrayList<Long>());
	}
	
	public void copyCart(String customer, String otherCustomer)
	{
		ArrayList<Long> itemsToCopy;
		
		if(customerCarts.containsKey(customer))
		{
			System.out.println("Copying from " + customer + " to " + otherCustomer);
			itemsToCopy = customerCarts.get(customer);
		}
		else
			itemsToCopy = new ArrayList<Long>();
		
		for(int i = 0; i < itemsToCopy.size(); i++)
			addItem(otherCustomer, itemsToCopy.get(i));
	}
}
