import React from 'react';
import Form from './components/ListTodo';
import List from './components/ListTodo/List'
import { StoreProvider } from './components/TodoContext';


function App() {
  return <StoreProvider>
    <h3>DashBoard</h3>
    <Form></Form>
    <List></List>
  </StoreProvider>
}
export default App;
