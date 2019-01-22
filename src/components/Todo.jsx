import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'antd'

const ListItem = List.Item
export default function Todo({text, onClick, completed}) {
    return (
        <ListItem
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {text}
        </ListItem>
    )
}

Todo.defaultProps = {
    completed: false
}

Todo.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool
}
