package com.sofka.williamfranco.backend.Repository;

import com.sofka.williamfranco.backend.Model.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}