package com.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService
{

	static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

	private long userCount;

	public JwtInMemoryUserDetailsService()
	{
		userCount = 20003;
	}

	static
	{
		inMemoryUserList.add(new JwtUserDetails(20000L, "temp",
				"$2a$10$KDLLS2LR6CN70N41MNRvLuE1pYytVd7S3Wf1qFYC8ToS71KLwHrhi", "ROLE_TEMP"));
		
		inMemoryUserList.add(new JwtUserDetails(20001L, "Scott",
				"$2a$10$wcFzYpwf65cp2EEwes6cwur2zbRamOEqz4jqm.15pou9j6eUTSnBa", "ROLE_USER"));

		inMemoryUserList.add(new JwtUserDetails(20002L, "Bob",
				"$2a$10$eHL7mEWNklWDWdyfkh.Lfu/rU8N695976mFr81KWxG4N4xcMFGRlO", "ROLE_USER"));
	}

	public JwtUserDetails addUser(String username, String password)
	{
		
		JwtUserDetails newUser = new JwtUserDetails(userCount, username, password, "ROLE_USER");
		
		if(!username.contentEquals(""))
		{
			inMemoryUserList.add(newUser);
			userCount++;	
			System.out.println("Created new user with username " + username);
		}
		else
			System.out.println("Did not create new user");
		
		return newUser;
	}

	@Override
	public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();

		if (!findFirst.isPresent())
		{
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
		}

		return findFirst.get();
	}

	public UserDetails loadUserById(Long id) throws UsernameNotFoundException
	{
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream().filter(user -> user.getId().equals(id))
				.findFirst();

		if (!findFirst.isPresent())
		{
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", id));
		}

		return findFirst.get();
	}
	
	public boolean userExists(String username)
	{
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();
		
		return findFirst.isPresent();
	}

}