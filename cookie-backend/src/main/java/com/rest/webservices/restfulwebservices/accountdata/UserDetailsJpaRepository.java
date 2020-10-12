package com.rest.webservices.restfulwebservices.accountdata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rest.webservices.restfulwebservices.node.ItemNode;

@Repository
public interface UserDetailsJpaRepository extends JpaRepository<UserDetailsNode, Long>
{
	
}
