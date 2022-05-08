import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../TodoContext';
import events from './events';
import consumer from './consumer';


const Todos = ({ listId, todo }) => {
    //const [lista, setLista] = useState({});

    //console.log(listId);
    const { dispatch } = useContext(Store);
    const [isLoaded, setLoaded] = useState(false);
    const list = todo.elements.filter((element) => {
       // console.log(element);
        return element.listId === listId;
    });

    useEffect(() => {
        // console.log(listId);
        consumer.findAllTodoBylist(listId)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((items) => {
                            console.log("succesfull todo");
                            //console.log(items);
                            //setLista(items);
                            setLoaded(true);
                            dispatch(events.finded(listId, items));
                        })
                }
            });
    }, [listId, dispatch]);


    const onDelete = (itemId) => {
        consumer.deleteTodoById(itemId)
            .then((response) => {
                if (response.ok) {
                    dispatch(events.deleted(listId, itemId))
                }
            })
    };

    const onEdit = (item) => {
        dispatch(events.onEdited(listId, item))
    };

    const onChangeState = (event, item) => {
        const request = {
            name: item.name,
            id: item.id,
            completed: event.target.checked
        };
        consumer.updateTodoByList(listId, request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(() => {
                            dispatch(events.updated(listId, request));
                        });
                }
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
            {!isLoaded && <div>loading....</div>}
            <table>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Task</td>
                        <td>Complete?</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {console.log(todo.elements)}
                    {console.log(list)}
                    {todo.elements.map((todo) => {
                        return <tr key={todo.id} style={todo.completed ? decorationDone : decorationToDo} id={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            {/* <td>{todos.completed ? "Task completed" : "Task pending"}</td> */}
                            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChangeState(event, todo)} /></td>
                            <td><button onClick={() => onDelete(todo.id)}>Delete</button></td>
                            <td><button disabled={todo.completed} onClick={() => onEdit(todo)}>Edit</button></td>
                            {/* <td><button className='btn btn-success' onClick={(event) => onChangeState(event, todos)}>Complete</button></td> */}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Todos;