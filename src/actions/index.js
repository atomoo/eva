let nextTodoId = 0
export const addTodo = text => ({
    type: 'todos.addTodo',
    payload: {
        id: nextTodoId++,
        text
    }
})

export const toggleTodo = id => ({
    type: 'todos.toggleTodo',
    payload: {id}
})
