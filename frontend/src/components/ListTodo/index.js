import React, { useContext, useRef, useState } from 'react'
import consumer from './consumer';
import events from './events';
import { Store } from '../TodoContext';

const Form = () => {

    const { dispatch } = useContext(Store);
    const formRef = useRef(null);
    const [state, setState] = useState({ name: "" });

    const onAddNewListTodo = (event) => {
        event.preventDefault();

        const request = {
            id: null,
            name: state.name
            //completed: false
        };
        consumer.saveNewListTodo(request)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((newList) => {
                            dispatch(events.saved(newList));
                            setState({ name: "" });
                            formRef.current.reset();
                        })
                }
            });
    }

    return (
        <div className='container'>
            <form ref={formRef}>
                <input
                    className='form-control'
                    type="text"
                    name="name"
                    placeholder="What do you think to do today?"
                    onChange={(event) => {
                        setState({ name: event.target.value })
                    }}  ></input>
                {<button className='btn btn-primary mt-3 mb-3' onClick={onAddNewListTodo}>Add New List To Do's</button>}
            </form>
        </div>

    );
}
export default Form;