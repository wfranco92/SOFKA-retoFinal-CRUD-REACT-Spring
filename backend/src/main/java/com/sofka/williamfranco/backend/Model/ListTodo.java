package com.sofka.williamfranco.backend.Model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class ListTodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "todo_id")
    private Set<Todo> todo;

    public Long getId() {
        return id;
    }

    public void setId(Long ind) {
        this.id = ind;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Todo> getTodo() {
        return todo;
    }

    public void setTodo(Set<Todo> todo) {
        this.todo = todo;
    }
}
