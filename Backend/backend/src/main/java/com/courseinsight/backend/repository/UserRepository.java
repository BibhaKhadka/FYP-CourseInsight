package com.courseinsight.backend.repository;
import com.courseinsight.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {
    //this will help to find the user by email during login.
    User findByEmail(String email);
    
}
    
