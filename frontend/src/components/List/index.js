import React, {useEffect, useContext} from 'react';
import { Store } from '../TodoContext';

const HOST_API = "http://localhost:8080/api";

const List = () => {

    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChangeState = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: true
        };
        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
            });
    };

    const decorationDone = {
        backgroundColor: "#97fab5"
    };

    const decorationToDo = {
        backgroundColor: "#fa9797"
    };

    return (
        <div>
            <table className='table mt-5'>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Task</td>
                        <td>Complete?</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {currentList.map((todo) => {
                        return <tr key={todo.id} style={todo.completed ? decorationDone : decorationToDo}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td>{todo.completed ? "Task completed" : "Task pending"}</td>
                            <td><button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button></td>
                            <td><button className='btn btn-secondary' onClick={() => onEdit(todo)}>Edit</button></td>
                            <td><button className='btn btn-success' onClick={(event) => onChangeState(event, todo)}>Complete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export {List};