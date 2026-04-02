package com.courseinsight.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    
    @Column(name = "recommended_course")
    private String recommendedCourse;

    @Column(name = "cluster_id")
    private Integer clusterId;

    private LocalDateTime createdAt;

    // Default Constructor
    public Result() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRecommendedCourse() { return recommendedCourse; }
    public void setRecommendedCourse(String recommendedCourse) { this.recommendedCourse = recommendedCourse; }

    public Integer getClusterId() { return clusterId; }
    public void setClusterId(Integer clusterId) { this.clusterId = clusterId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}