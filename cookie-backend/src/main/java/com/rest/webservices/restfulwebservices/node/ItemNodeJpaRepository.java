package com.rest.webservices.restfulwebservices.node;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemNodeJpaRepository extends JpaRepository<ItemNode, Long>
{
	
}
