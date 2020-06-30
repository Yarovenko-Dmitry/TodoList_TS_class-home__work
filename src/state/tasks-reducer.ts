import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType1 = {
  type: 'REMOVE_TASK',
  taskId: string,
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD_TASK',
  title: string,
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS',
  taskId: string,
  isDone: boolean,
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE',
  taskId: string,
  title: string,
  todolistId: string
}

type ActionsType =
  RemoveTaskActionType1
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  let copyState;
  switch (action.type) {
    case 'REMOVE_TASK':
      copyState = {...state};
      copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId);
      return copyState
    case 'ADD_TASK':
      copyState = {...state};
      let newTask = {id: v1(), title: action.title, isDone: false}
      copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]];
      return copyState
    case 'CHANGE_TASK_STATUS':
      copyState = {...state};
      copyState[action.todolistId] = copyState[action.todolistId].map(t => {
        if (t.id !== action.taskId) {
          return t
        } else {
          return {...t, isDone: action.isDone}
        }
      })
      return copyState
    case 'CHANGE_TASK_TITLE':
      copyState = {...state};
      copyState[action.todolistId] = copyState[action.todolistId].map(t => {
        if (t.id !== action.taskId) {
          return t
        } else {
          return {...t, title: action.title}
        }
      })
      return copyState
    case 'ADD-TODOLIST':
      copyState = {...state};
      copyState[action.todolistId] = []
      return copyState
    case 'REMOVE-TODOLIST':
      copyState = {...state};
      delete copyState[action.id];
      return copyState
    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType1 => {
  return {type: 'REMOVE_TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD_TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
}
