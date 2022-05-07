import React, { useContext, useRef, useState } from 'react'
import consumer from './consumer';
import { Store } from '../TodoContext';


// const HOST_API = "http://localhost:8080/api";

const Form = (props) => {

    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const formRef = useRef(null);
    const [state, setState] = useState(item);

    const onAddNewListTodo = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            completed: false
        };
        consumer.saveNewListTodo(request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((newList) => {
                            dispatch({ type: "add-item", item: newList });
                            setState({ name: "" });
                            formRef.current.reset();
                        })
                }
            });
    }


    // const request = {
    //     name: state.name,
    //     id: null,
    //     completed: false
    // };
    // fetch(HOST_API + "/todolist", {
    //     method: "POST",
    //     body: JSON.stringify(request),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then((todo) => {
    //         dispatch({ type: "add-item", item: todo });
    //         setState({ name: "" });
    //         formRef.current.reset();
    //     });

    // const onEdit = (event) => {
    //     event.preventDefault();

    //     const request = {
    //         name: state.name,
    //         id: item.id,
    //         isCompleted: item.isCompleted
    //     };


    //     fetch(HOST_API + "/todo", {
    //         method: "PUT",
    //         body: JSON.stringify(request),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then((todo) => {
    //             dispatch({ type: "update-item", item: todo });
    //             setState({ name: "" });
    //             formRef.current.reset();
    //         });
    // }
    return (
        <form ref={formRef}>
            <input
                className='form-control'
                type="text"
                name="name"
                placeholder="What do you think to do today?"
                defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value })
                }}  ></input>
            {/*{item.id && <button className='btn btn-primary mt-3' onClick={onEdit}>Update Task</button>}*/}
            {!item.id && <button className='btn btn-primary mt-3' onClick={onAddNewListTodo}>Create Task</button>}
            {props.children}
        </form>
    );
}
export default Form;