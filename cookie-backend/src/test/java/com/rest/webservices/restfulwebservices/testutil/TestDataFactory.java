package com.rest.webservices.restfulwebservices.testutil;

import com.rest.webservices.restfulwebservices.todo.Todo;
import com.rest.webservices.restfulwebservices.jwt.User;

import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Utility class for creating test data objects
 */
public class TestDataFactory {

    /**
     * Creates a test Todo with default values
     */
    public static Todo createTestTodo() {
        return createTestTodo(1L, "testuser", "Test todo description", false);
    }

    /**
     * Creates a test Todo with specified parameters
     */
    public static Todo createTestTodo(Long id, String username, String description, boolean isDone) {
        Date targetDate = new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1));
        return new Todo(id, username, description, targetDate, isDone);
    }

    /**
     * Creates a test Todo without ID (for save operations)
     */
    public static Todo createNewTodo(String username, String description) {
        return createTestTodo(null, username, description, false);
    }

    /**
     * Creates a completed test Todo
     */
    public static Todo createCompletedTodo(String username, String description) {
        return createTestTodo(null, username, description, true);
    }

    /**
     * Creates a test User
     */
    public static User createTestUser() {
        return createTestUser(1L, "testuser", "password123");
    }

    /**
     * Creates a test User with specified parameters
     */
    public static User createTestUser(Long id, String username, String password) {
        return new User(id, username, password);
    }

    /**
     * Creates a test User without ID (for save operations)
     */
    public static User createNewUser(String username, String password) {
        return createTestUser(null, username, password);
    }
}