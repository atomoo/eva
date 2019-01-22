export default {
    state: [],
    reducer: {
        addTodo: (state, {payload}) => ([
            ...state,
            {
                id: payload.id,
                text: payload.text,
                completed: false
            }
        ]),
        toggleTodo: (state, {payload}) => (
            state.map(todo => (
                (todo.id === payload.id)
                    ? {...todo, completed: !todo.completed}
                    : todo
            ))
        )
    }
}
