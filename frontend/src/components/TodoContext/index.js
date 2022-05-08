import React, { createContext, useReducer } from 'react'
import reducerTodo from '../ListTodo/reducer';
import reducerListTodo from '../Todo/reducer';

const initialState = {

    list: {
        elements: []
    },
    todo: {
        elements: [],
        item: {}
    },
    mensage: {}
};
const Store = createContext(initialState)

const merge = { ...reducerTodo(), ...reducerListTodo() };
function reducer(state, action) {
    console.log("Dispatch", action.type)
    return merge[action.type] ? merge[action.type](state, action) : state;
}

export const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </Store.Provider>
    );
}

export { Store };