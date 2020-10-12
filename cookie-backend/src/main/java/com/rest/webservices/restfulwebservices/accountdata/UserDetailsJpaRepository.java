package com.rest.webservices.restfulwebservices.accountdata;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsJpaRepository extends JpaRepository<UserDetailsNode, Long>
{
	List<UserDetailsNode> findByUsername(String username);
}
