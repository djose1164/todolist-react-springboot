package com.example.springboot.service;

import com.example.springboot.entity.Todo;
import com.example.springboot.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TodoServiceImpl implements TodoService {
    public TodoServiceImpl(TodoRepository tr) {
        todoRepository = tr;
    }

    @Override
    public Todo create(Todo todo) {
        Todo savedTodo = todoRepository.save(todo);
        log.info("Todo created successfully!");
        return savedTodo;
    }

    @Override
    public void update(Todo todo) {
        var existingTodo = todoRepository.findById(todo.getId());
        if (existingTodo.isEmpty()) {
            log.info("Cannot update todo: the todo doesn't exist.");
            return;
        }
        todoRepository.save(todo);
        log.info("Todo updated successfully!");
    }

    @Override
    public Optional<Todo> getById(Integer id) {
        return todoRepository.findById(id);
    }

    @Override
    public List<Todo> getAllTodos() {
        Sort sortBy = Sort.by(Sort.Direction.ASC, "id");
        return todoRepository.findAll(sortBy);
    }

    @Override
    public void deleteById(Integer id) {
        todoRepository.deleteById(id);
        log.info("Todo deleted successfully!");
    }

    private final TodoRepository todoRepository;
}
