package com.example.springboot.service;

import com.example.springboot.entity.Todo;

import java.util.List;
import java.util.Optional;


public interface TodoService {
    Todo create(Todo todo);

    void update(Todo todo);

    Optional<Todo> getById(Integer id);

    List<Todo> getAllTodos();

    void deleteById(Integer id);
}
