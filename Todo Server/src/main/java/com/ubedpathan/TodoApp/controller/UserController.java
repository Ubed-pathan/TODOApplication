package com.ubedpathan.TodoApp.controller;

import com.ubedpathan.TodoApp.DTOs.UserDTO;
import com.ubedpathan.TodoApp.entity.UserEntity;
import com.ubedpathan.TodoApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> handleUserSignUp(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append(" ");
            }
            return new ResponseEntity<>(errorMessage.toString().trim(), HttpStatus.BAD_REQUEST);
        }

        boolean result = userService.handleUserSignup(userDTO);
        if(result)
            return new ResponseEntity<>("SignUp successful", HttpStatus.OK);
        else
            return new ResponseEntity<>("User not SignUp", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> handleUserSignIn(@RequestBody UserEntity user){
        if((user.getUsername() != "" && user.getUsername() != null) && (user.getPassword() != "" && user.getPassword() != null)){
            String cookie = userService.handleUserSignin(user);
            if(cookie != null && cookie != ""){
                return new ResponseEntity<>(cookie, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        else{
            return new ResponseEntity<>("Please fill full info",HttpStatus.BAD_REQUEST);
        }
    }
}
