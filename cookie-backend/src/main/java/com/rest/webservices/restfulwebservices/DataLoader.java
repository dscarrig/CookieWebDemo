package com.rest.webservices.restfulwebservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.rest.webservices.restfulwebservices.jwt.User;
import com.rest.webservices.restfulwebservices.jwt.UserJpaRepository;
import com.rest.webservices.restfulwebservices.node.ItemNode;
import com.rest.webservices.restfulwebservices.node.ItemNodeJpaRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ItemNodeJpaRepository itemNodeRepository;
    
    @Autowired
    private UserJpaRepository appUserRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        // Load cookie items if they don't exist
        if (itemNodeRepository.count() == 0) {
            loadCookieItems();
        }
        
        // Load default users if they don't exist
        if (appUserRepository.count() == 0) {
            loadDefaultUsers();
        }
    }
    
    private void loadCookieItems() {
        itemNodeRepository.save(new ItemNode(null, "Chocolate Chips", "Cookie with chocolate chips", 9.99, "assets/chocolate-chip.jpg"));
        itemNodeRepository.save(new ItemNode(null, "Snickerdoodle", "Cinnamon sugar", 12.52, "assets/snickerdoodle.jpg"));
        itemNodeRepository.save(new ItemNode(null, "Sugar", "Frosted sugary goodness", 2.45, "assets/sugar.jpg"));
        itemNodeRepository.save(new ItemNode(null, "Spice", "Hot and spicy", 5.55, "assets/spice.jpg"));
        itemNodeRepository.save(new ItemNode(null, "Everything Nice", "Full of secret special ingredients", 4.19, "assets/everything-nice.jpg"));
        
        System.out.println("Loaded default cookie items");
    }
    
    private void loadDefaultUsers() {
        String encodedPassword = passwordEncoder.encode("dummy");
        
        appUserRepository.save(new User(null, "testuser", encodedPassword));
        appUserRepository.save(new User(null, "admin", encodedPassword));
        appUserRepository.save(new User(null, "temp", encodedPassword));
        
        System.out.println("Loaded default users");
    }
}