import React from 'react'
import {List} from 'antd'
import PropTypes from 'prop-types'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {

    console.log(todos)
    return (
        <List bordered>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => {
                        toggleTodo(todo.id)
                    }}
                />
            ))}
        </List>
    )
}

TodoList.defaultProps = {
    todos: []
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    toggleTodo: PropTypes.func.isRequired
}
