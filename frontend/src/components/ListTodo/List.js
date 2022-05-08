import React, { useEffect, useContext, useState } from 'react';
import consumer from './consumer';
import events from './events';
import { Store } from '../TodoContext';
import FormTodos from '../Todo/FormTodos';
import Todos from '../Todo/Todos';

const List = () => {

    const { state: { list, todo }, dispatch} = useContext(Store);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        consumer.findAllListTodo()
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((list) => {
                            dispatch(events.finded(list))
                        });
                }
                setLoaded(true);
            })
    }, [dispatch]);

    const onDelete = (listId) => {
        consumer.deleteListTodoByID(listId)
            .then((response) => {
                if (response.ok) {
                    dispatch(events.deleted(listId))
                }
            })
    };

    return (
        <div>
            {!isLoaded && <div>loading ...</div>}
            {list.elements.map((element) => {
                return <div key={element.id} id={"list-to-do" + element.id} className="borderDiv">
                    <fieldset>
                        <legend>
                            <h3> {element.name} <button className='btn btn-outline-danger' onClick={() => onDelete(element.id)}>Delete</button></h3>
                        </legend>

                    </fieldset>
                    <FormTodos listId={element.id} todo={todo}/>
                    <Todos listId={element.id} todo={todo}/>
                </div>
            })}
        </div>
    );
}

export default List;