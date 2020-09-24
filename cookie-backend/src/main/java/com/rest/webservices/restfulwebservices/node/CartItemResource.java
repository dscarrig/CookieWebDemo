package com.rest.webservices.restfulwebservices.node;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CartItemResource {

	@Autowired
	private CartItemUtils cartItemUtils;
	
	@Autowired
	private ItemNodeJpaRepository itemNodeJpaRepository;
	
	@PostMapping("/jpa/users/{username}/cart/add")
	public ResponseEntity<ItemNode> addItemToCart(@PathVariable String username, @RequestBody Long itemId)
	{
		cartItemUtils.addItem(username, itemId);
		
		return new ResponseEntity<ItemNode>(HttpStatus.OK);
	}
	
	@GetMapping("/jpa/users/{username}/cart")
	public List<ItemNode> getAllCartItems(@PathVariable String username)
	{
		List<ItemNode> result = new ArrayList<ItemNode>();
		List<Long> itemIds = cartItemUtils.getUsersItems(username);
		
		if(itemIds != null)
		{
			for(int i = 0; i < itemIds.size(); i++)
			{
				result.add(itemNodeJpaRepository.findById(itemIds.get(i)).get());
			}
		}
		
		return result;
	}
	
	@DeleteMapping("/jpa/users/{username}/cart/delete/{itemId}")
	public ResponseEntity<ItemNode> removeCartItem(@PathVariable String username, @PathVariable Long itemId)
	{
		cartItemUtils.removeItem(username, itemId);
		
		return  new ResponseEntity<ItemNode>(HttpStatus.OK);
	}
	
}
