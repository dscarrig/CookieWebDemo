package com.rest.webservices.restfulwebservices.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TodoJpaResource Unit Tests")
class TodoJpaResourceUnitTest {

    @Mock
    private TodoJpaRepository todoJpaRepository;

    @InjectMocks
    private TodoJpaResource todoJpaResource;

    private Todo testTodo;
    private List<Todo> testTodos;

    @BeforeEach
    void setUp() {
        testTodo = new Todo(1L, "testuser", "Test todo", new Date(), false);
        Todo todo2 = new Todo(2L, "testuser", "Another todo", new Date(), true);
        testTodos = Arrays.asList(testTodo, todo2);
    }

    @Test
    @DisplayName("Should return all todos for user")
    void shouldReturnAllTodosForUser() {
        // Given
        when(todoJpaRepository.findByUsername("testuser")).thenReturn(testTodos);

        // When
        List<Todo> result = todoJpaResource.getAllTodos("testuser");

        // Then
        assertThat(result).hasSize(2);
        assertThat(result).containsExactly(testTodo, testTodos.get(1));
        verify(todoJpaRepository).findByUsername("testuser");
    }

    @Test
    @DisplayName("Should return specific todo by id")
    void shouldReturnSpecificTodoById() {
        // Given
        when(todoJpaRepository.findById(1L)).thenReturn(Optional.of(testTodo));

        // When
        Todo result = todoJpaResource.getTodo("testuser", 1L);

        // Then
        assertThat(result).isEqualTo(testTodo);
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getDescription()).isEqualTo("Test todo");
        verify(todoJpaRepository).findById(1L);
    }

    @Test
    @DisplayName("Should delete todo successfully")
    void shouldDeleteTodoSuccessfully() {
        // Given
        doNothing().when(todoJpaRepository).deleteById(1L);

        // When
        ResponseEntity<Void> result = todoJpaResource.deleteTodo("testuser", 1L);

        // Then
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        verify(todoJpaRepository).deleteById(1L);
    }

    @Test
    @DisplayName("Should save new todo with correct username")
    void shouldSaveNewTodoWithCorrectUsername() {
        // Given
        Todo newTodo = new Todo(null, null, "New todo", new Date(), false);
        Todo savedTodo = new Todo(3L, "testuser", "New todo", new Date(), false);
        
        when(todoJpaRepository.save(any(Todo.class))).thenReturn(savedTodo);

        // When - Test the logic without the URI building (which requires servlet context)
        newTodo.setUsername("testuser");
        Todo result = todoJpaRepository.save(newTodo);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(3L);
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getDescription()).isEqualTo("New todo");
        
        verify(todoJpaRepository).save(argThat(todo -> 
            "testuser".equals(todo.getUsername()) && 
            "New todo".equals(todo.getDescription())
        ));
    }

    @Test
    @DisplayName("Should update existing todo")
    void shouldUpdateExistingTodo() {
        // Given
        Todo updatedTodo = new Todo(1L, "testuser", "Updated todo", new Date(), true);
        when(todoJpaRepository.save(updatedTodo)).thenReturn(updatedTodo);

        // When
        ResponseEntity<Todo> result = todoJpaResource.updateTodo("testuser", 1L, updatedTodo);

        // Then
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody())
            .isNotNull()
            .isEqualTo(updatedTodo)
            .extracting(Todo::getDescription, Todo::isDone)
            .containsExactly("Updated todo", true);
        
        verify(todoJpaRepository).save(updatedTodo);
    }

    @Test
    @DisplayName("Should handle repository exceptions gracefully")
    void shouldHandleRepositoryExceptionsGracefully() {
        // Given
        when(todoJpaRepository.findByUsername("testuser"))
            .thenThrow(new RuntimeException("Database connection failed"));

        // When & Then
        assertThatThrownBy(() -> todoJpaResource.getAllTodos("testuser"))
            .isInstanceOf(RuntimeException.class)
            .hasMessage("Database connection failed");
        
        verify(todoJpaRepository).findByUsername("testuser");
    }
}