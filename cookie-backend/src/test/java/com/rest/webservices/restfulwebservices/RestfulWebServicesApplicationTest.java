package com.rest.webservices.restfulwebservices;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Application Context Tests")
class RestfulWebServicesApplicationTest {

    @Test
    @DisplayName("Should load Spring context successfully")
    void shouldLoadSpringContextSuccessfully() {
        // This test will pass if the Spring context loads without any issues
        // It validates that all beans are configured correctly
    }
}