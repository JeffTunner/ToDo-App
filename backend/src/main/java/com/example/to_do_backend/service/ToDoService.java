package com.example.to_do_backend.service;

import com.example.auth_reference.entity.UserInfo;
import com.example.auth_reference.repository.UserRepository;
import com.example.to_do_backend.dto.RequestDto;
import com.example.to_do_backend.dto.ResponseDto;
import com.example.to_do_backend.entity.Todo;
import com.example.to_do_backend.exception.ResourceNotFoundException;
import com.example.to_do_backend.exception.UnauthorizedException;
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
        int nextPosition = repository.countByUser(user);
        todo.setPosition(nextPosition);
        Todo saved = repository.save(todo);
        return toDto(saved);
    }

    public List<ResponseDto> getByFilter(String username, String filter) {
        UserInfo user = userRepository.findByUsername(username);
        List<Todo> todos;
        switch (filter.toLowerCase()) {
            case "active" -> todos = repository.findByUserAndActiveTrueOrderByPositionAsc(user);
            case "completed" -> todos = repository.findByUserAndActiveFalseOrderByPositionAsc(user);
            default -> todos = repository.findByUserOrderByPositionAsc(user);
        }
        return todos.stream().map(this::toDto).toList();
    }

    public ResponseDto markCompleted(Long id, String username) {
        UserInfo user = userRepository.findByUsername(username);
        Todo found = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not Found"));
        if(!found.getUser().equals(user)) {
            throw new UnauthorizedException("Not Authorized");
        }
        found.setActive(false);
        Todo saved = repository.save(found);
        return toDto(saved);
    }

    public void deleteList(Long id, String username) {
        UserInfo user = userRepository.findByUsername(username);
        Todo found = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not Found"));
        if(!found.getUser().equals(user)) {
            throw new UnauthorizedException("Not Authorized");
        }
        repository.delete(found);
    }

    public void reorder(List<Long> orderIds, String username) {
        UserInfo user = userRepository.findByUsername(username);

        for (int i = 0; i < orderIds.size(); i++) {
            Todo todo = repository.findById(orderIds.get(i)).orElseThrow();

            if(!todo.getUser().equals(user)) {
                throw new UnauthorizedException("Not Authorized");
            }
            todo.setPosition(i);
            repository.save(todo);
        }
    }
}
