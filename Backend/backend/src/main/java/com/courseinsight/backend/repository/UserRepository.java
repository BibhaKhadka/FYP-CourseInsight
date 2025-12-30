package com.courseinsight.backend.repository;
import com.courseinsight.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {
    //this will help to find the user by email during login.
    Optional<User> findByEmail(String email);
    
}
    
