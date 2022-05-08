import { actionType } from "./events";

const reducerTodo = () => {
    const action = {};

    action[actionType.LIST_FINDED] = (state, action) => {
        const list = state.todo.elements;
        action.items.forEach(element => {
            list.push(element);
        });
        return { ...state, todo: { elements: list, item: {}} }
    };

    action[actionType.LIST_CREATED] = (state, action) => {
        const list = state.todo.elements;
        list.push(action.item);
        return { ...state, todo: { elements: list, item: {} } };
    };

    action[actionType.LIST_ON_EDITED] = (state, action) => {
        const editTodo = { ...state.todo}
        editTodo.item[action.listId] = action.item;
        return { ...state, todo: editTodo }
    };

    action[actionType.LIST_UPDATED] = (state, action) => {
        const list = state.todo.elements.map(element =>{
            if(element.id === action.item.id){
                return {...action.item, listId: action.listId};
            }
            return element;
        });
        return { ...state, todo: { elements: list, item: {} } };
    };

    action[actionType.LIST_DELETED] = (state, action) => {
        const list = state.todo.elements.filter(element => {
            return element.id !== action.itemId;
        });
        return { ...state, todo: { elements: list, item:{} } };
    };

    return action;
}

export default reducerTodo;