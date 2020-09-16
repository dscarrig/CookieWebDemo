package com.rest.webservices.restfulwebservices.node;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class ItemNodeJpaResource
{
	@Autowired
	private ItemNodeJpaRepository itemNodeJpaRepository;

	@GetMapping("/jpa/items")
	public List<ItemNode> getAllItems()
	{
		return itemNodeJpaRepository.findAll();
	}

	@GetMapping("/jpa/items/{id}")
	public ItemNode getItem(@PathVariable long id)
	{
		return itemNodeJpaRepository.findById(id).get();
	}
}
