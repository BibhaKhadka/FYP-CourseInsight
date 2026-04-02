package com.courseinsight.backend.controller;

import com.courseinsight.backend.model.User;
import com.courseinsight.backend.model.Result; // New Model
import com.courseinsight.backend.repository.UserRepository;
import com.courseinsight.backend.repository.ResultRepository; // New Repository
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") 
public class AuthController {

    private final UserRepository userRepository;
    private final ResultRepository resultRepository; // Added for results

    // Constructor Injection for both repositories
    public AuthController(UserRepository userRepository, ResultRepository resultRepository) {
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            if (userRepository.findByEmail(user.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered!");
            }
            userRepository.save(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    
    // --- NEW: Endpoint to save the result from the AI Quiz ---
    @PostMapping("/save-result")
    public ResponseEntity<String> saveResult(@RequestBody Result result) {
        try {
            resultRepository.save(result);
            return ResponseEntity.ok("Result saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database Error: " + e.getMessage());
        }
    }
}