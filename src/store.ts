import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './state/todolists-reducer';
import {tasksReducer} from './state/tasks-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})


export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;