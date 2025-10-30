package com.rest.webservices.restfulwebservices.accountdata;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.rest.webservices.restfulwebservices.node.ItemNode;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserDataResource
{

	@Autowired
	private UserDetailsJpaRepository userDetailsRepository;



	@PostMapping("/jpa/users/{username}/account-details/add")
	@Transactional
	public ResponseEntity<ItemNode> addUserAccountData(@PathVariable String username, @RequestBody String userDetails)
	{
		UserDetailsNode newNode;
		String[] detailArray = userDetails.split("_");
		List<UserDetailsNode> nodeList;

		if (detailArray.length == 7)
		{
			String fullName = detailArray[0];
			String address = detailArray[1];
			String addressTwo = detailArray[2];
			String city = detailArray[3];
			String state = detailArray[4];
			String zipCode = detailArray[5];
			String cardNum = detailArray[6];

			// Let the database auto-generate the ID
			newNode = new UserDetailsNode(null, username, fullName, address, addressTwo, city, state, zipCode, cardNum);

			nodeList = userDetailsRepository.findByUsername(username);

			// Check if address already exists and update it, otherwise create new
			UserDetailsNode existingNode = null;
			for (UserDetailsNode node : nodeList) {
				if (node.getAddress().contentEquals(address)) {
					existingNode = node;
					break;
				}
			}

			if (existingNode != null) {
				// Update existing entity instead of deleting and creating new one
				existingNode.setFullName(fullName);
				existingNode.setAddressTwo(addressTwo);
				existingNode.setCity(city);
				existingNode.setState(state);
				existingNode.setZipCode(zipCode);
				existingNode.setCardNum(cardNum);
				userDetailsRepository.save(existingNode);
				newNode = existingNode; // For the response
			} else {
				// Create new entity
				userDetailsRepository.save(newNode);
			}
		} else
		{
			System.out.println("----> Wrong sized array: " + userDetails);
			// Let the database auto-generate the ID for empty node too
			newNode = new UserDetailsNode(null, username, "", "", "", "", "", "", "");
		}

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newNode.getUsername())
				.toUri();

		return ResponseEntity.created(uri).build();
	}



	@GetMapping("/jpa/users/{username}/account-details/get-account-details")
	public UserDetailsNode getAccountDetails(@PathVariable String username)
	{
		UserDetailsNode thisNode;

		List<UserDetailsNode> nodeList = userDetailsRepository.findByUsername(username);

		if (nodeList.isEmpty())
		{
			thisNode = new UserDetailsNode(0L, username, "", "", "", "", "", "", "");
		} else
		{
			thisNode = nodeList.get(nodeList.size() - 1);
		}

		return thisNode;

	}

	@GetMapping("/jpa/users/{username}/account-details/get-all-users-account-details")
	public List<UserDetailsNode> getAllUsersAccountDetails(@PathVariable String username)
	{
		List<UserDetailsNode> nodeList = userDetailsRepository.findByUsername(username);

		return nodeList;
	}

	@PostMapping("/jpa/users/{username}/account-details/delete-account-detail")
	@Transactional
	public ResponseEntity<Void> deleteAccountDetail(@PathVariable String username,
			@RequestBody UserDetailsNode toDelete)
	{
		List<UserDetailsNode> nodeList = userDetailsRepository.findByUsername(username);

		for (int i = 0; i < nodeList.size(); i++)
		{
			if (nodeList.get(i).getAddress().contentEquals(toDelete.getAddress()))
			{
				userDetailsRepository.delete(nodeList.get(i));
				userDetailsRepository.flush(); // Ensure delete is committed
				break;
			}
		}

		return ResponseEntity.noContent().build();
	}

	@PostMapping("/jpa/users/{username}/account-details/set-new-default")
	@Transactional
	public ResponseEntity<Void> setNewDefault(@PathVariable String username, @RequestBody UserDetailsNode newDefault)
	{
		List<UserDetailsNode> nodeList = userDetailsRepository.findByUsername(username);

		for (int i = 0; i < nodeList.size(); i++)
		{
			if (nodeList.get(i).getAddress().contentEquals(newDefault.getAddress()))
			{
				userDetailsRepository.delete(nodeList.get(i));
				userDetailsRepository.flush(); // Ensure delete is committed before save
				userDetailsRepository.save(newDefault);
				break;
			}
		}

		return ResponseEntity.noContent().build();
	}

}
