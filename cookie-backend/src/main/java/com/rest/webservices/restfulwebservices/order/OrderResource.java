package com.rest.webservices.restfulwebservices.order;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rest.webservices.restfulwebservices.jwt.User;
import com.rest.webservices.restfulwebservices.jwt.UserJpaRepository;
import com.rest.webservices.restfulwebservices.node.ItemNode;
import com.rest.webservices.restfulwebservices.node.ItemNodeJpaRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/orders")
public class OrderResource
{
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserJpaRepository userRepository;

	@Autowired
	private ItemNodeJpaRepository itemRepository;

	@GetMapping("/user/{username}")
	public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable String username)
	{
		List<Order> orders = orderRepository.findByUser_UserNameOrderByDateDesc(username);
		List<OrderDTO> orderDTOs = orders.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
		return ResponseEntity.ok(orderDTOs);
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id)
	{
		return orderRepository.findById(id)
				.map(order -> ResponseEntity.ok(convertToDTO(order)))
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO)
	{
		User user = userRepository.findByUserName(orderDTO.getUsername());
		if (user == null)
		{
			return ResponseEntity.badRequest().build();
		}

		Order order = new Order();
		order.setUser(user);
		order.setDate(LocalDateTime.now());
		order.setStatus(orderDTO.getStatus() != null ? orderDTO.getStatus() : "PENDING");
		order.setTotal(orderDTO.getTotal());

		// Add order items
		if (orderDTO.getItems() != null)
		{
			for (OrderItemDTO itemDTO : orderDTO.getItems())
			{
				ItemNode item = itemRepository.findById(itemDTO.getItemId()).orElse(null);
				if (item != null)
				{
					OrderItem orderItem = new OrderItem();
					orderItem.setItem(item);
					orderItem.setQuantity(itemDTO.getQuantity());
					orderItem.setItemPrice(itemDTO.getItemPrice());
					order.addOrderItem(orderItem);
				}
			}
		}

		Order savedOrder = orderRepository.save(order);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(savedOrder.getId())
				.toUri();

		return ResponseEntity.created(uri).body(convertToDTO(savedOrder));
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @RequestBody String status)
	{
		return orderRepository.findById(id)
				.map(order -> {
					order.setStatus(status);
					Order updatedOrder = orderRepository.save(order);
					return ResponseEntity.ok(convertToDTO(updatedOrder));
				})
				.orElse(ResponseEntity.notFound().build());
	}

	private OrderDTO convertToDTO(Order order)
	{
		List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
				.map(item -> new OrderItemDTO(
						item.getItem().getId(),
						item.getItem().getItemName(),
						item.getQuantity(),
						item.getItemPrice()))
				.collect(Collectors.toList());

		return new OrderDTO(
				order.getId(),
				order.getUser().getUserName(),
				order.getDate(),
				order.getStatus(),
				order.getTotal(),
				itemDTOs);
	}
}
