package com.sofka.williamfranco.backend.Service;

import com.sofka.williamfranco.backend.Model.ListTodo;
import com.sofka.williamfranco.backend.Model.ListTodoModelPlain;
import com.sofka.williamfranco.backend.Model.Todo;
import com.sofka.williamfranco.backend.Model.TodoModelPlain;
import com.sofka.williamfranco.backend.Repository.TodoListRepository;
import com.sofka.williamfranco.backend.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TodoService {

    public static  final String NO_FAULT_ID = "No existe el id d ela lista";
    private TodoRepository todoRepository;
    private TodoListRepository todoListRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository, TodoListRepository todoListRepository) {
        this.todoRepository = todoRepository;
        this.todoListRepository = todoListRepository;
    }

    public Set<ListTodoModelPlain> listTodos() {
        return StreamSupport
                .stream(todoListRepository.findAll().spliterator(), false)
                .map(list -> {
                    var listDto = list.getTodo()
                            .stream()
                            .map(item -> new TodoModelPlain(item.getId(), item.getName(), item.isCompleted(), list.getId()))
                            .collect(Collectors.toSet());
                    return new ListTodoModelPlain(list.getId(), list.getName(), listDto);
                })
                .collect(Collectors.toSet());
    }

    public Set<TodoModelPlain> listTodosByList(Long idList) {
        return todoListRepository.findById(idList)
                .orElseThrow(() -> new RuntimeException(NO_FAULT_ID))
                .getTodo().stream()
                .map(item -> new TodoModelPlain(item.getId(), item.getName(), item.isCompleted(), idList))
                .collect(Collectors.toSet());
    }

    public ListTodoModelPlain newListTodos(ListTodoModelPlain todoList) {
        var listTodo = new ListTodo();
        listTodo.setName(Objects.requireNonNull(todoList.getName()));
        if(listTodo.getName().isEmpty() || listTodo.getName().length() < 5){
            throw new RuntimeException("No es un valor valido para guardar");
        }

        var id = todoListRepository.save(listTodo).getId();
        todoList.setId(id);
        return todoList;
    }

    public TodoModelPlain newTodoByList(Long idlist, TodoModelPlain todoModelPlain) {
        var listTodo = todoListRepository.findById(idlist)
                .orElseThrow(() -> new RuntimeException(NO_FAULT_ID));

        var toDo = new Todo();
        toDo.setCompleted(todoModelPlain.isCompleted());
        toDo.setName(todoModelPlain.getName());
        toDo.setId(todoModelPlain.getId());

        if(toDo.getName().isEmpty() || toDo.getName().length() < 5){
            throw new RuntimeException("No es un valor valido para guardar");
        }

        listTodo.getTodo().add(toDo);

        var listUpdated = todoListRepository.save(listTodo);

        var lastTodo = listUpdated.getTodo()
                .stream()
                .max(Comparator.comparingInt(item -> item.getId().intValue()))
                .orElseThrow();
        todoModelPlain.setId(lastTodo.getId());
        todoModelPlain.setListid(idlist);
        return todoModelPlain;

    }

    public TodoModelPlain updateListTodo(Long idlist, TodoModelPlain todo) {
        var listTodo = todoListRepository.findById(idlist)
                .orElseThrow(() -> new RuntimeException(NO_FAULT_ID));

        for (var item: listTodo.getTodo()){
            if(item.getId().equals(todo.getId())){
                item.setCompleted(todo.isCompleted());
                item.setName(Objects.requireNonNull(todo.getName()));
                item.setId(Objects.requireNonNull(todo.getId()));
            }
        }
        todoListRepository.save(listTodo);
        return todo;
    }

    public void deleteTodoByList(Long id) {
        var todo = todoRepository.findById(id).orElseThrow();
        todoRepository.delete(todo);
    }

    public void deleteList(Long id) {
        var listodo = todoListRepository.findById(id)
                .orElseThrow(()-> new RuntimeException(NO_FAULT_ID)) ;
        todoListRepository.delete(listodo);
    }
}
