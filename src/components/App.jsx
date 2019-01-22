import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div style={{padding: '50px'}}>
        <AddTodo />
        <VisibleTodoList />
    </div>
)

export default App
