package com.rest.webservices.restfulwebservices;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.rest.webservices.restfulwebservices.jwt.User;
import com.rest.webservices.restfulwebservices.jwt.UserJpaRepository;
import com.rest.webservices.restfulwebservices.node.ItemNode;
import com.rest.webservices.restfulwebservices.node.ItemNodeJpaRepository;
import com.rest.webservices.restfulwebservices.order.Order;
import com.rest.webservices.restfulwebservices.order.OrderItem;
import com.rest.webservices.restfulwebservices.order.OrderRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ItemNodeJpaRepository itemNodeRepository;
    
    @Autowired
    private UserJpaRepository appUserRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
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
        
        // Load mock orders if they don't exist
        if (orderRepository.count() == 0) {
            loadMockOrders();
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
    
    private void loadMockOrders() {
        // Get users and items
        User testUser = appUserRepository.findByUserName("testuser");
        User adminUser = appUserRepository.findByUserName("admin");
        List<ItemNode> items = itemNodeRepository.findAll();
        
        if (testUser == null || items.isEmpty()) {
            System.out.println("Cannot load orders: users or items not found");
            return;
        }
        
        // Order 1 - Recent completed order for testuser
        Order order1 = new Order();
        order1.setUser(testUser);
        order1.setDate(LocalDateTime.now().minusDays(2));
        order1.setStatus("COMPLETED");
        order1.setTotal(22.51);
        
        OrderItem item1_1 = new OrderItem(null, order1, items.get(0), 2, 9.99); // 2 Chocolate Chips
        OrderItem item1_2 = new OrderItem(null, order1, items.get(2), 1, 2.45); // 1 Sugar
        order1.addOrderItem(item1_1);
        order1.addOrderItem(item1_2);
        orderRepository.save(order1);
        
        // Order 2 - Shipped order for testuser
        Order order2 = new Order();
        order2.setUser(testUser);
        order2.setDate(LocalDateTime.now().minusDays(7));
        order2.setStatus("SHIPPED");
        order2.setTotal(30.58);
        
        OrderItem item2_1 = new OrderItem(null, order2, items.get(1), 1, 12.52); // 1 Snickerdoodle
        OrderItem item2_2 = new OrderItem(null, order2, items.get(3), 2, 5.55); // 2 Spice
        OrderItem item2_3 = new OrderItem(null, order2, items.get(4), 2, 4.19); // 2 Everything Nice
        order2.addOrderItem(item2_1);
        order2.addOrderItem(item2_2);
        order2.addOrderItem(item2_3);
        orderRepository.save(order2);
        
        // Order 3 - Older completed order for testuser
        Order order3 = new Order();
        order3.setUser(testUser);
        order3.setDate(LocalDateTime.now().minusDays(15));
        order3.setStatus("COMPLETED");
        order3.setTotal(14.64);
        
        OrderItem item3_1 = new OrderItem(null, order3, items.get(0), 1, 9.99); // 1 Chocolate Chips
        OrderItem item3_2 = new OrderItem(null, order3, items.get(2), 1, 2.45); // 1 Sugar
        OrderItem item3_3 = new OrderItem(null, order3, items.get(3), 1, 5.55); // 1 Spice (different price for testing)
        order3.addOrderItem(item3_1);
        order3.addOrderItem(item3_2);
        order3.addOrderItem(item3_3);
        orderRepository.save(order3);
        
        // Order 4 - Pending order for testuser
        Order order4 = new Order();
        order4.setUser(testUser);
        order4.setDate(LocalDateTime.now().minusHours(3));
        order4.setStatus("PENDING");
        order4.setTotal(37.00);
        
        OrderItem item4_1 = new OrderItem(null, order4, items.get(1), 2, 12.52); // 2 Snickerdoodle
        OrderItem item4_2 = new OrderItem(null, order4, items.get(4), 3, 4.19); // 3 Everything Nice
        order4.addOrderItem(item4_1);
        order4.addOrderItem(item4_2);
        orderRepository.save(order4);
        
        // Order 5 - Admin user order
        if (adminUser != null) {
            Order order5 = new Order();
            order5.setUser(adminUser);
            order5.setDate(LocalDateTime.now().minusDays(5));
            order5.setStatus("COMPLETED");
            order5.setTotal(27.07);
            
            OrderItem item5_1 = new OrderItem(null, order5, items.get(0), 1, 9.99); // 1 Chocolate Chips
            OrderItem item5_2 = new OrderItem(null, order5, items.get(1), 1, 12.52); // 1 Snickerdoodle
            OrderItem item5_3 = new OrderItem(null, order5, items.get(2), 2, 2.45); // 2 Sugar
            order5.addOrderItem(item5_1);
            order5.addOrderItem(item5_2);
            order5.addOrderItem(item5_3);
            orderRepository.save(order5);
        }
        
        System.out.println("Loaded mock order history");
    }
}