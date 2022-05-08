import React, {  useContext, useRef, useState } from 'react'
import consumer from './consumer';
import events from './events';
import { Store } from '../TodoContext';

const FormTodos = ({ listId, todo }) => {
    const formRef = useRef(null);
    const { dispatch } = useContext(Store);
    const item = todo.item[listId] ? todo.item[listId] : {};
    const [state, setState] = useState(item);

    const onAddNewTodo = (event) => {
        event.preventDefault();

        const request = {
            id: null,
            name: state.name,
            completed: false
        };
        consumer.saveNewTodoByList(listId, request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((result) => {
                            dispatch(events.saved(listId, result));
                            setState({ name: "" });
                            formRef.current.reset();
                        })
                }
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            completed: item.completed
        };

        consumer.updateTodoByList(listId, request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            dispatch(events.updated(listId, result));
                            setState({ name: "" });
                            formRef.current.reset();
                        });
                }
            });
    }

    return (

            <form ref={formRef} id={listId}>
                <input
                    type="text"
                    name="name"
                    placeholder="What is your task?"
                    defaultValue={item.name}
                    className='form-control mb-3'
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}  ></input>
                {item.id && <button className='btn btn-primary' onClick={onEdit}>Update Task</button>}
                {!item.id && <button className='btn btn-primary' onClick={onAddNewTodo}>Create Task</button>}
            </form>

    );
}

export default FormTodos;