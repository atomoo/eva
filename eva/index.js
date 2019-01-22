import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {
    createStore, applyMiddleware, combineReducers, compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as effects from 'redux-saga/effects'

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export default class Eva {
    constructor(preloadedState) {
        this.preloadedState = {}
        if (preloadedState) {
            this.preloadedState = preloadedState
        }
        this.errorHandle = function errorHandle(...args) {
            console.error(args)
        }
    }

    appReducer = {}

    appEffect = {}

    effectActions = [];

    onError(fn) {
        if (typeof fn === 'function') {
            this.errorHandle = fn
        }
    }

    * rootWatcher() {
        while (true) {
            const {type, ...others} = yield effects.take(this.effectActions)
            if (this.appEffect[type]) {
                try {
                    yield effects.call(this.appEffect[type], effects, others)
                } catch (e) {
                    this.errorHandle(e)
                }
            }
        }
    }

    * rootSaga() {
        const {all, fork} = effects
        yield all([fork(this.rootWatcher.bind(this))])
    }

    loadModel(models) {
        if (!models || !isObject(models)) {
            throw new Error('models needs to be an Object')
        }
        Object.keys(models).forEach(key => {
            if (this.appReducer[key]) {
                throw new Error(`module for ${key} already exist`)
            }
            const model = models[key]
            const modelInitialState = model.state
            // reducer
            this.appReducer[key] = function reducer(state = modelInitialState, {type, payload}) {
                const modelAndReducer = type.split('.')
                if (modelAndReducer.length === 2 && modelAndReducer[0] === key && model.reducer[modelAndReducer[1]]) {
                    return model.reducer[modelAndReducer[1]](state, {type, payload})
                }
                return state
            }
            // effect
            if (model.effect && isObject(model.effect)) {
                Object.keys(model.effect).forEach(effectName => {
                    const effectActionType = `${key}.${effectName}`
                    this.appEffect[effectActionType] = model.effect[effectName]
                    this.effectActions.push(effectActionType)
                })
            }
        })
    }

    configureStore() {
        const sagaMiddleware = createSagaMiddleware()
        /* eslint-disable */
        const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
        /* eslint-enable */
        this.store = createStore(
            combineReducers(this.appReducer),
            this.preloadedState,
            composeEnhancers(applyMiddleware(sagaMiddleware))
        )
        sagaMiddleware.run(this.rootSaga.bind(this))
    }

    render(dom, App) {
        if (!dom) {
            throw new Error('need a DOM to render')
        }
        this.configureStore()
        ReactDOM.render(<Provider store={this.store}><App /></Provider>, dom)
    }
}
