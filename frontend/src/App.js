import React from 'react';
import Form from './components/Form';
import {ListTodo} from './components/Form/ListTodo'

function App() {
  return <div className='container mt-5'>
    <h3>DashBoard</h3>
    <Form>
      <ListTodo>
      </ListTodo>
    </Form>
  </div>
}
export default App;
