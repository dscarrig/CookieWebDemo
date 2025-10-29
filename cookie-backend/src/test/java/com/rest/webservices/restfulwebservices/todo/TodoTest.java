package com.rest.webservices.restfulwebservices.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Date;

import static org.assertj.core.api.Assertions.*;

@DisplayName("Todo Entity Tests")
class TodoTest {

    private Todo todo;
    private Date targetDate;

    @BeforeEach
    void setUp() {
        targetDate = new Date();
        todo = new Todo(1L, "testuser", "Test todo description", targetDate, false);
    }

    @Test
    @DisplayName("Should create todo with all properties")
    void shouldCreateTodoWithAllProperties() {
        // Given & When (created in setUp)
        
        // Then
        assertThat(todo.getId()).isEqualTo(1L);
        assertThat(todo.getUsername()).isEqualTo("testuser");
        assertThat(todo.getDescription()).isEqualTo("Test todo description");
        assertThat(todo.getTargetDate()).isEqualTo(targetDate);
        assertThat(todo.isDone()).isFalse();
    }

    @Test
    @DisplayName("Should update todo properties correctly")
    void shouldUpdateTodoPropertiesCorrectly() {
        // Given
        Date newDate = new Date(System.currentTimeMillis() + 86400000); // tomorrow
        
        // When
        todo.setDescription("Updated description");
        todo.setDone(true);
        todo.setTargetDate(newDate);
        
        // Then
        assertThat(todo.getDescription()).isEqualTo("Updated description");
        assertThat(todo.isDone()).isTrue();
        assertThat(todo.getTargetDate()).isEqualTo(newDate);
    }

    @Test
    @DisplayName("Should implement equals and hashCode correctly")
    void shouldImplementEqualsAndHashCodeCorrectly() {
        // Given
        Todo sameTodo = new Todo(1L, "different", "different", new Date(), true);
        Todo differentTodo = new Todo(2L, "testuser", "Test todo description", targetDate, false);
        
        // Then
        assertThat(todo).isEqualTo(sameTodo); // Same ID
        assertThat(todo).isNotEqualTo(differentTodo); // Different ID
        assertThat(todo.hashCode()).isEqualTo(sameTodo.hashCode());
    }

    @Test
    @DisplayName("Should not be equal to null or different class")
    void shouldNotBeEqualToNullOrDifferentClass() {
        // Then
        assertThat(todo).isNotEqualTo(null);
        assertThat(todo).isNotEqualTo("string");
        assertThat(todo).isEqualTo(todo); // reflexive
    }
}