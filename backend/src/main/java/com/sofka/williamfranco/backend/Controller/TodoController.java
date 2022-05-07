package com.sofka.williamfranco.backend.Controller;

import com.sofka.williamfranco.backend.Model.ListTodoModelPlain;
import com.sofka.williamfranco.backend.Model.TodoModelPlain;
import com.sofka.williamfranco.backend.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private TodoService todoService;

    @Autowired
    public TodoController (TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping(value = "api/list")
    public Iterable<ListTodoModelPlain> listTodos(){
        return todoService.listTodos();
    }

    @GetMapping(value = "api/{idlist}/todos")
    public Iterable<TodoModelPlain> listTodosByList(@PathVariable("idlist") Long idList){
        return todoService.listTodosByList(idList);
    }

    @PostMapping(value = "api/todolist")
    public ListTodoModelPlain newListTodos(@RequestBody ListTodoModelPlain todoList){
        return todoService.newListTodos(todoList);
    }

    @PostMapping(value = "/api/{idlist}/todo")
    public TodoModelPlain newTodoByList(@PathVariable("idlist") Long idlist, @RequestBody TodoModelPlain todoModelPlain){
        return todoService.newTodoByList(idlist, todoModelPlain);
    }

    @PutMapping(value = "api/{idlist}/todo")
    public TodoModelPlain updateTodo(@PathVariable("idlist") Long idlist, @RequestBody TodoModelPlain todo){
        if(todo.getId() != null){
            return todoService.updateListTodo(idlist, todo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void deleteTodoByList(@PathVariable("id")Long id){
        todoService.deleteTodoByList(id);
    }

    @DeleteMapping(value = "api/{idlist}/todolist")
    public void deleteList(@PathVariable("idlist")Long idlist){
        todoService.deleteList(idlist);
    }

}
