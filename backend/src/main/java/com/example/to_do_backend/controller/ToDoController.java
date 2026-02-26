package com.example.to_do_backend.controller;

import com.example.auth_reference.entity.UserInfo;
import com.example.to_do_backend.dto.RequestDto;
import com.example.to_do_backend.dto.ResponseDto;
import com.example.to_do_backend.service.ToDoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ToDoController {

    @Autowired
    ToDoService service;

    @PostMapping("/todo")
    public ResponseDto create(@RequestBody @Valid RequestDto dto, Authentication authentication) {
        String username = authentication.getName();
        return service.createToDo(dto, username);
    }

    @GetMapping("/todo/all")
    public List<ResponseDto> all(Authentication authentication) {
        String username = authentication.getName();
        return service.getAll(username);
    }

    @PatchMapping("/todo/completed/{id}")
    public ResponseDto complete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        return service.markCompleted(id, username);
    }

    @DeleteMapping("/todo/delete/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        service.deleteList(id, username);
    }
}
