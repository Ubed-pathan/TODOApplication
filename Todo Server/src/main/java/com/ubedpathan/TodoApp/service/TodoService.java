package com.ubedpathan.TodoApp.service;

import com.ubedpathan.TodoApp.entity.TodoEntries;
import com.ubedpathan.TodoApp.repository.TodoRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TodoService {
    List<TodoEntries> todos = new ArrayList<>();

    @Autowired
    private TodoRepository todoRepository;


    public String addTodos(TodoEntries todoEntries) {
            todoEntries.setDate(LocalDateTime.now());
            todoRepository.save(todoEntries);
            return "Added successfully !";
    }

    public List<TodoEntries> getAllTodos() {
        List<TodoEntries> allTodos = todoRepository.findByCompletedFalse();
        return allTodos;
    }

    public boolean updateTodo(Map<String, Object> editTodo) {
        ObjectId todoId = new ObjectId(String.valueOf(editTodo.get("id")));
        Optional<TodoEntries> optionalTodo = todoRepository.findById(todoId);
        if(optionalTodo.isEmpty()){
            return false;
        }
        else{
            TodoEntries todo = optionalTodo.get();
            todo.setTitle((String) editTodo.get("title"));
            todo.setContent((String) editTodo.get("content"));
            todoRepository.save(todo);
            return true;
        }

    }

    public boolean deleteTodoById(ObjectId id) {
        Optional<TodoEntries> findTodoById = todoRepository.findById(id);
        if(findTodoById.isEmpty()){
            return false;
        }
        else{
            todoRepository.deleteById(id);
            return true;
        }
    }
}
