package com.sofka.williamfranco.backend.Model;

public class TodoModelPlain {
    private Long listid;
    private Long id;
    private String name;
    private boolean completed;

    public TodoModelPlain(){
        super();
    }

    public TodoModelPlain(Long id, String name, boolean completed, Long idList) {
        this.listid = idList;
        this.id = id;
        this.name = name;
        this.completed = completed;
    }

    public Long getListid() {
        return listid;
    }

    public void setListid(Long listid) {
        this.listid = listid;
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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
