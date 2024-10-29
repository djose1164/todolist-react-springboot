package com.example.springboot.controller;

import com.example.springboot.entity.Todo;
import com.example.springboot.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@Validated
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    @GetMapping("/")
    public ResponseEntity<List<Todo>> getAllTodos() {
        var listing = todoService.getAllTodos();
        return ResponseEntity.ok().body(listing);
    }

    @PostMapping("/")
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        return ResponseEntity.ok().body(todoService.create(todo));
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<Object> patch(@PathVariable int todoId, @RequestBody Map<String, Object> payload) {
        var fetched = todoService.getById(todoId);
        if (fetched.isEmpty())
            return ResponseEntity.notFound().build();

        var todo = fetched.get();
        todo.setDone((Boolean) payload.get("done"));
        todoService.update(todo);
        return ResponseEntity.ok().body("Todo Updated!");
    }

    private final TodoService todoService;
}
