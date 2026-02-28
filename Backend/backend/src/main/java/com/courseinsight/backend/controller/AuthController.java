package com.courseinsight.backend.controller;

import com.courseinsight.backend.model.User;
import com.courseinsight.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
// Ensure this matches your React Port (5173)
@CrossOrigin(origins = "http://localhost:5173") 
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            // Check if user already exists
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
        // 1. Find the user by email
        User user = userRepository.findByEmail(loginUser.getEmail());

        // 2. Check if user exists and password matches
        // Note: For production, you should use passwordEncoder.matches()
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            // This exact string MUST match what React is looking for
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}