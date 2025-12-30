package com.courseinsight.backend.controller;
import com.courseinsight.backend.model.User;
import com.courseinsight.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") //this will allow React to talk to Java.

public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userRepository.save(user);
        return "User registered successfully!";
    }
    @PostMapping("/signin")
    public String signin(@RequestBody User user) {
        return userRepository.findByEmail(user.getEmail()).filter(u -> u.getPassword().equals(user.getPassword())).map(u -> "Signin successful!").orElse("Invalid email or password");
    }
    
    
     
}
