import React from 'react';
import Form from './components/ListTodo';
import List from './components/ListTodo/List'
import { StoreProvider } from './components/TodoContext';


function App() {
  return <StoreProvider>
    <h3 className='tittle'>DashBoard</h3>
    <div className='container'>
      <Form></Form>
      <List></List>
    </div>
  </StoreProvider>
}
export default App;
