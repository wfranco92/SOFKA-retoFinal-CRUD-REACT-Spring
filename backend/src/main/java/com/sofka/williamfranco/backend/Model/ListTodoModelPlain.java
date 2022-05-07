package com.sofka.williamfranco.backend.Model;

import java.util.Set;

public class ListTodoModelPlain {

    private Long id;
    private String name;

    private Set<TodoModelPlain> todoModelPlains;

    public ListTodoModelPlain(){
        super();
    }

    public ListTodoModelPlain(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ListTodoModelPlain(Long id, String name, Set<TodoModelPlain> listDto) {
        this.id = id;
        this.name = name;
        this.todoModelPlains = listDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
