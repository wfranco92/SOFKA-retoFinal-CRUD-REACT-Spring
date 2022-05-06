import React from 'react';
import {List} from './components/List';
import Form from './components/Form';

function App() {
  return <div className='container mt-5'>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </div>
}
export default App;
