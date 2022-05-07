import React, { useEffect, useContext } from 'react';
import consumer from './consumer';
import { Store } from '../TodoContext';

const ListTodo = () => {

    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        consumer.findAllListTodo()
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);

    const onDelete = (id) => {
        consumer.deleteListTodoByID(id)
            .then((list) => {
                dispatch({ type: "delete-item", id })
            })
    };

    return (
        <div>
            {currentList.map((todo) => {
                return <ul key={todo.id}>
                    {todo.name} ---
                    <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button>
                </ul>
            })}
        </div>
    );
}

export { ListTodo };