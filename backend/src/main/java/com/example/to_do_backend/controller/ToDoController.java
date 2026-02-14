package com.example.to_do_backend.controller;

import com.example.to_do_backend.dto.RequestDto;
import com.example.to_do_backend.dto.ResponseDto;
import com.example.to_do_backend.service.ToDoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ToDoController {

    @Autowired
    ToDoService service;

    @PostMapping("/todo")
    public ResponseDto create(@RequestBody @Valid RequestDto dto) {
        return service.createToDo(dto);
    }

    @GetMapping("/todo/all")
    public List<ResponseDto> all() {
        return service.getAll();
    }

    @PatchMapping("/todo/completed/{id}")
    public ResponseDto complete(@PathVariable Long id) {
        return service.markCompleted(id);
    }

    @DeleteMapping("/todo/delete/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteList(id);
    }
}
