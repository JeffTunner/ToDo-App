package com.example.to_do_backend.service;

import com.example.auth_reference.entity.UserInfo;
import com.example.auth_reference.repository.UserRepository;
import com.example.to_do_backend.dto.RequestDto;
import com.example.to_do_backend.dto.ResponseDto;
import com.example.to_do_backend.entity.Todo;
import com.example.to_do_backend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    ToDoRepository repository;

    @Autowired
    UserRepository userRepository;

    //DTO -> Entity
    private Todo toEntity(RequestDto dto) {
        Todo todo = new Todo();
        todo.setDescription(dto.getDescription());
        todo.setActive(true);
        return todo;
    }

    //Entity -> DTO
    private ResponseDto toDto(Todo todo) {
        return new ResponseDto(todo.getId(), todo.getDescription(), todo.isActive());
    }

    public ResponseDto createToDo(RequestDto dto, String username) {
        UserInfo user = userRepository.findByUsername(username);
        Todo todo = toEntity(dto);
        todo.setUser(user);
        Todo saved = repository.save(todo);
        return toDto(saved);
    }

    public List<ResponseDto> getAll(String username) {
        UserInfo user = userRepository.findByUsername(username);
        List<Todo> all = repository.findByUser(user);
        return all.stream().map(this::toDto).toList();
    }

    public ResponseDto markCompleted(Long id) {
        Todo found = repository.findById(id).orElseThrow(() -> new RuntimeException("List not found"));
        found.setActive(false);
        Todo saved = repository.save(found);
        return toDto(saved);
    }

    public void deleteList(Long id) {
        Todo found = repository.findById(id).orElseThrow(() -> new RuntimeException("List not found"));
        repository.delete(found);
    }
}
