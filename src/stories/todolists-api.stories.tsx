import React, {useEffect, useState} from 'react'

import axios from 'axios'
import {todoApi} from '../api/todolist-api';

export default {
  title: 'API'
}
const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '7670157b-55fb-46c4-91b5-ea5772613da8'
  }

}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoApi.getTodolist()
      // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        debugger
        setState(res.data)

      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = '123123'
    todoApi.createTodo(title)
      // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings);
      .then((res) => {
        debugger
        setState(res.data.resultCode)
      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = 'dda5e41b-c02d-4a15-880c-541094e30f90'
    todoApi.deleteTodo(todoId)
      // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,settings)
      .then((res) => {
        debugger
        setState(res.data.resultCode)
      })
      .catch((e: any) => {
          debugger
        }
      )
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
    const newTitle = '11111111111111111111111111111111111111111111111';
    todoApi.updateTodoTitle(todoId, newTitle)
      // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,payload, settings)
      .then((res) => {
        debugger
        setState(res.data.resultCode)
      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
    todoApi.getTodoTasks(todolistId)
      // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        debugger
        setState(res.data.items)
      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
    const title = 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
    todoApi.createTask(todolistId, title)
      // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings);
      .then((res) => {
        debugger
        setState(res.data)
      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');;
  const [taskId, setTaskId] = useState<string>('');


  // useEffect(() => {
  //   const todolistId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
  //   const taskId = '9284fe9f-768f-4d48-aaa0-f5da163b8385';
  //   todoApi.deleteTask(todolistId,taskId)
  //     // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,settings)
  //     .then((res) => {
  //       debugger
  //       setState(res.data.resultCode)
  //     })
  //     .catch((e: any) => {
  //         debugger
  //       }
  //     )
  //   // здесь мы будем делать запрос и ответ закидывать в стейт.
  //   // который в виде строки будем отображать в div-ке
  //
  // }, [])

  const deleteTask = () => {
    // const todolistId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
    // const taskId = '9284fe9f-768f-4d48-aaa0-f5da163b8385';
    todoApi.deleteTask(todolistId,taskId)
      .then((res) => {
        debugger
        setState(res.data.resultCode)
      })
      .catch((e: any) => {
          debugger
        }
      )

  }

  return <div> {JSON.stringify(state)}
  <div>
    <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> {setTodolistId(e.currentTarget.value)}}/>
    <input placeholder={'taskId'} value={taskId} onChange={(e)=> {setTaskId(e.currentTarget.value)}}/>
    <button onClick={deleteTask}> delete task</button>
  </div>
  </div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '77be9397-736e-499d-8e4a-cf4a73b6a24b';
    const taskId = '9284fe9f-768f-4d48-aaa0-f5da163b8385';
    const newTaskTitle = '11111111111111task1111111111title11111111111';
    todoApi.updateTask(todoId, taskId, newTaskTitle)
      // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,payload, settings)
      .then((res) => {
        debugger
        setState(res.data.resultCode)
      })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return <div> {JSON.stringify(state)}</div>
}