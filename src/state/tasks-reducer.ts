import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {ResultCodeStatus} from '../AppWithRedux';
import {config} from '@storybook/addon-actions';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: TaskType
}

export type UpdateTaskActionType = {
  type: 'UPDATE-TASK',
  todolistId: string
  taskId: string
  model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

export type SetTaskActionType = {
  type: 'SET-TASKS',
  tasks: Array<TaskType>,
  todolistId: string
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTaskActionType
  ;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id != action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const newTask: TaskType = action.task
      const tasks = stateCopy[newTask.todoListId];
      const newTasks = [newTask, ...tasks];
      stateCopy[newTask.todoListId] = newTasks;
      return stateCopy;
    }
    case 'UPDATE-TASK': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    case 'SET-TODOLISTS': {
      const copyState = {...state};
      action.todolists.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState;
    }
    case 'SET-TASKS': {
      const copyState = {...state};
      copyState[action.todolistId] = action.tasks
      return copyState;
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
  return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTaskActionType => {
  return {
    type: 'SET-TASKS', tasks, todolistId
  }
}


export const fetchTaskTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId))
      })
  }
}

// export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
//   (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     let tasks = getState().tasks
//
//     let task = tasks[todolistId].find((t) => {
//       return t.id === taskId
//     });
//
//     if (task) {
//       let updatedTask = {...task, status: status};
//
//       todolistsAPI.updateTask(todolistId, taskId, updatedTask)
//         .then((res) => {
//           if (res.data.resultCode === ResultCodeStatus.success) {
//             dispatch(updateTaskAC(taskId, status, todolistId));
//           }
//         })
//     }
//   }

export const removeTaskTC = (taskId: string, todolistId: string) =>
  (dispatch: Dispatch) => {

    todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
          const action = removeTaskAC(taskId, todolistId);
          dispatch(action);
        }
      )
  }

export const addTaskTC = (title: string, todolistId: string) =>
  (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
          const task = res.data.data.item;
          const action = addTaskAC(task);
          dispatch(action);
        }
      )
  }



export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t=> t.id === taskId);

    if (!task) {
      // throw new Error('no task in the state')
      console.warn('no task in the state')
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.addedDate,
      deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
          const action = updateTaskAC(taskId, domainModel, todolistId);
          dispatch(action);
        }
      )
  }





