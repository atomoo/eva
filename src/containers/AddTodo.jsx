
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
    Input, Button, Row, Col
} from 'antd'
import {addTodo} from '../actions'

class AddTodo extends React.Component {
    state = {
        todo: ''
    }

    handleChange = e => {
        this.setState({
            todo: e.target.value
        })
    }

    handleSubmit = () => {
        const {todo} = this.state
        const {dispatch} = this.props
        if (todo) {
            dispatch(addTodo(todo))
            this.setState({
                todo: ''
            })
        }
    }

    render() {
        const {todo} = this.state
        return (
            <Row style={{marginBottom: '50px'}}>
                <Col span={16}>
                    <Input onChange={this.handleChange} value={todo} />
                </Col>
                <Col span={8}>
                    <Button onClick={this.handleSubmit}>Add Todo</Button>
                </Col>
            </Row>
        )
    }
}

AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect()(AddTodo)
