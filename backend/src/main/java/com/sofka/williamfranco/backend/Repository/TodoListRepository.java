package com.sofka.williamfranco.backend.Repository;

import com.sofka.williamfranco.backend.Model.ListTodo;
import org.springframework.data.repository.CrudRepository;

public interface TodoListRepository extends CrudRepository<ListTodo, Long> {
}
