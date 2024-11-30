package com.ubedpathan.TodoApp.controller;

import com.ubedpathan.TodoApp.entity.CompletedEntity;
import com.ubedpathan.TodoApp.service.CompletedService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/completed")
public class CompletedTodoController {

    @Autowired
    private CompletedService completedService;

    @PutMapping("/{id}")
    public ResponseEntity<String> completeTodo(@PathVariable ObjectId id) {
        boolean isCompleted = completedService.completeTodo(id);

        if (isCompleted) {
            return new ResponseEntity<>("Todo marked as completed successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Todo not found!", HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping
//    public ResponseEntity<?> getCompletedTodos() {
//        return new ResponseEntity<>(completedService.getAllCompletedTodos(), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<List<CompletedEntity>> getAllCompletedTodos() {
        List<CompletedEntity> completedTodos = completedService.getAllCompletedTodos();
        return ResponseEntity.ok(completedTodos);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCompletedTodo(@RequestBody Map<String, ObjectId> todoIds){
        if((todoIds.containsKey("completedId") && (todoIds.get("completedId") != null)) && (todoIds.containsKey("todoId") && (todoIds.get("todoId") != null))) {
            ObjectId completedId = todoIds.get("completedId");
            ObjectId todoId = todoIds.get("todoId");
            boolean check = completedService.deleteCompletedTodoAndTodo(completedId, todoId);
            if (check)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
