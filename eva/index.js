import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {
    createStore, applyMiddleware, combineReducers, compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

const modelf = {
    posts: {
        state: {},
        reducer: {
            postsByReddit: function f() {}
        },
        effect: {
            fetchPosts: function f() {}
        }
    }
}

export default class Eva {
    constructor(dom, preloadedState) {
        if (!dom) {
            throw new Error('need a DOM to render')
        }
        this.dom = dom
        if (preloadedState) {
            this.preloadedState = preloadedState
        }
    }

    appReducer = {}

    appEffect = {}

    loadModel(models) {
        if (!models || !isObject(models)) {
            throw new Error('model needs to be an Object')
        }
        Object.keys(models).forEach(key => {
            if (this.appReducer[key]) {
                throw new Error(`module for ${key} already exist`)
            }
            const model = models[key]
            const modelInitialState = model.state
            this.appReducer[key] = function reducer(state = modelInitialState, {type, payload}) {
                // dispatch({type: 'posts.postsByReddit})
                const modelAndReducer = type.split('.')
                if (modelAndReducer.length === 2 && modelAndReducer[0] === key && model.reducer[modelAndReducer[1]]) {
                    return model.reducer[modelAndReducer[1]](state, {type, payload})
                }
                return state
            }
        })
    }

    render() {
        const sagaMiddleware = createSagaMiddleware()
        /* eslint-disable */
        const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
        /* eslint-enable */
        const store = createStore(
            combineReducers(this.appReducers),
            this.preloadedState,
            composeEnhancers(applyMiddleware(sagaMiddleware))
        )

        ReactDOM.render(<Provider store={store} />, this.dom)
    }
}
