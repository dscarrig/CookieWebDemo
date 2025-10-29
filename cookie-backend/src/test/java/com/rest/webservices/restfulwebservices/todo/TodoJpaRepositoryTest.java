package com.rest.webservices.restfulwebservices.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@DisplayName("TodoJpaRepository Integration Tests")
class TodoJpaRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TodoJpaRepository todoJpaRepository;

    private Todo testTodo1;
    private Todo testTodo2;
    private Todo otherUserTodo;

    @BeforeEach
    void setUp() {
        testTodo1 = new Todo(null, "testuser", "First todo", new Date(), false);
        testTodo2 = new Todo(null, "testuser", "Second todo", new Date(), true);
        otherUserTodo = new Todo(null, "otheruser", "Other user todo", new Date(), false);
        
        // Persist test data
        entityManager.persistAndFlush(testTodo1);
        entityManager.persistAndFlush(testTodo2);
        entityManager.persistAndFlush(otherUserTodo);
    }

    @Test
    @DisplayName("Should find all todos by username")
    void shouldFindAllTodosByUsername() {
        // When
        List<Todo> userTodos = todoJpaRepository.findByUsername("testuser");

        // Then
        assertThat(userTodos).hasSize(2);
        assertThat(userTodos).extracting(Todo::getDescription)
            .containsExactlyInAnyOrder("First todo", "Second todo");
        assertThat(userTodos).allMatch(todo -> "testuser".equals(todo.getUsername()));
    }

    @Test
    @DisplayName("Should return empty list for non-existent user")
    void shouldReturnEmptyListForNonExistentUser() {
        // When
        List<Todo> userTodos = todoJpaRepository.findByUsername("nonexistent");

        // Then
        assertThat(userTodos).isEmpty();
    }

    @Test
    @DisplayName("Should save new todo")
    void shouldSaveNewTodo() {
        // Given
        Todo newTodo = new Todo(null, "newuser", "New todo", new Date(), false);

        // When
        Todo savedTodo = todoJpaRepository.save(newTodo);

        // Then
        assertThat(savedTodo.getId()).isNotNull();
        assertThat(savedTodo.getUsername()).isEqualTo("newuser");
        assertThat(savedTodo.getDescription()).isEqualTo("New todo");
        assertThat(savedTodo.isDone()).isFalse();
    }

    @Test
    @DisplayName("Should update existing todo")
    void shouldUpdateExistingTodo() {
        // Given
        testTodo1.setDescription("Updated description");
        testTodo1.setDone(true);

        // When
        Todo updatedTodo = todoJpaRepository.save(testTodo1);

        // Then
        assertThat(updatedTodo.getId()).isEqualTo(testTodo1.getId());
        assertThat(updatedTodo.getDescription()).isEqualTo("Updated description");
        assertThat(updatedTodo.isDone()).isTrue();
    }

    @Test
    @DisplayName("Should delete todo by id")
    void shouldDeleteTodoById() {
        // Given
        Long todoId = testTodo1.getId();
        assertThat(todoJpaRepository.findById(todoId)).isPresent();

        // When
        todoJpaRepository.deleteById(todoId);

        // Then
        assertThat(todoJpaRepository.findById(todoId)).isEmpty();
        assertThat(todoJpaRepository.findByUsername("testuser")).hasSize(1);
    }

    @Test
    @DisplayName("Should maintain data integrity across users")
    void shouldMaintainDataIntegrityAcrossUsers() {
        // When
        List<Todo> testUserTodos = todoJpaRepository.findByUsername("testuser");
        List<Todo> otherUserTodos = todoJpaRepository.findByUsername("otheruser");

        // Then
        assertThat(testUserTodos).hasSize(2);
        assertThat(otherUserTodos).hasSize(1);
        assertThat(testUserTodos).noneMatch(todo -> "otheruser".equals(todo.getUsername()));
        assertThat(otherUserTodos).noneMatch(todo -> "testuser".equals(todo.getUsername()));
    }
}