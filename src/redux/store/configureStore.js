import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from 'redux-thunk'

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('reservation', serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('reservation')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(thunkMiddleware),

    //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
        return f;
    }
));

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});

export default store;