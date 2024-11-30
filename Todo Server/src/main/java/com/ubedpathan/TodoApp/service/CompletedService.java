package com.ubedpathan.TodoApp.service;

import com.ubedpathan.TodoApp.entity.CompletedEntity;
import com.ubedpathan.TodoApp.entity.TodoEntries;
import com.ubedpathan.TodoApp.repository.CompletedRepository;
import com.ubedpathan.TodoApp.repository.TodoRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompletedService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private CompletedRepository completedRepository;

    @Autowired
    private TodoService todoService;

    public boolean completeTodo(ObjectId id) {
        Optional<TodoEntries> todoOptional = todoRepository.findById(id);
        if (todoOptional.isEmpty()) {
            return false;
        }

        // Create a new CompletedEntity and set the reference to the TodoEntries
        TodoEntries todo = todoOptional.get();
        todo.setCompleted(true);
        CompletedEntity completedEntity = new CompletedEntity();
        completedEntity.setTodoEntry(todo);  // Store the reference to the TodoEntries
        completedEntity.setCompletedDate(LocalDateTime.now());

        completedRepository.save(completedEntity);
        todoRepository.save(todo);

        return true;
    }

    public List<CompletedEntity> getAllCompletedTodos() {
        return completedRepository.findAll();
    }

    public boolean deleteCompletedTodoAndTodo(ObjectId completedId, ObjectId todoId) {
        boolean checkTodo = todoService.deleteTodoById(todoId);
        boolean checkCompleted = false;
        if (checkTodo) {
            Optional<CompletedEntity> findCompletedTodoById = completedRepository.findById(completedId);
            if (findCompletedTodoById.isEmpty()) {
                return false;
            } else {
                completedRepository.deleteById(completedId);
                return true;
            }

        } else {
            return false;
        }
    }
}
