import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../TodoContext';
import events from './events';
import consumer from './consumer';


const Todos = ({ listId, todo }) => {

    const { dispatch } = useContext(Store);
    const [isLoaded, setLoaded] = useState(false);

    console.log(todo.elements);

    const list = todo.elements.filter(element => {
        return element.listid === listId;
    });


    useEffect(() => {
        consumer.findAllTodoBylist(listId)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    response.json()
                        .then((items) => {
                            console.log("succesfull todo");
                            console.log(items);
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
                    {console.log("lista de elementos")}
                    {console.log(list)}
                    {list.map((todo) => {
                        return <tr key={todo.id} style={todo.completed ? decorationDone : decorationToDo} id={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChangeState(event, todo)} /></td>
                            <td><button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button></td>
                            <td><button className='btn btn-secondary' disabled={todo.completed} onClick={() => onEdit(todo)}>Edit</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Todos;