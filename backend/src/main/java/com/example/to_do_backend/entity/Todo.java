package com.example.to_do_backend.entity;

import com.example.auth_reference.entity.UserInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;

    @Column(nullable = false)
    private Integer position;

}
