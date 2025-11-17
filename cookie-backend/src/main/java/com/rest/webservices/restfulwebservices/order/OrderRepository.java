package com.rest.webservices.restfulwebservices.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>
{
	List<Order> findByUser_UserName(String username);
	
	List<Order> findByUser_UserNameOrderByDateDesc(String username);
	
	List<Order> findByStatus(String status);
}
