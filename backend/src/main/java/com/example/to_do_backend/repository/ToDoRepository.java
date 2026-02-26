package com.example.to_do_backend.repository;

import com.example.auth_reference.entity.UserInfo;
import com.example.to_do_backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUser(UserInfo user);

    int countByUser(UserInfo user);

    List<Todo> findByUserOrderByPositionAsc(UserInfo user);

    List<Todo> findByUserAndActiveTrueOrderByPositionAsc(UserInfo user);

    List<Todo> findByUserAndActiveFalseOrderByPositionAsc(UserInfo user);
}
