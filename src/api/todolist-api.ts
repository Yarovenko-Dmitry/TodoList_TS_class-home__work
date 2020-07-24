import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '7670157b-55fb-46c4-91b5-ea5772613da8'
  }
})

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

type TaskType = {
  description: string | null
  title: string
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTasksResponseType = {
  items: Array<TaskType>
  totalCount: number
  error: string | null
}

type UpdateTaskType = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string
  deadline: string | null
}

const UpdateTask: UpdateTaskType = {
  title: '1',
  description: null,
  status: 0,
  priority: 1,
  startDate: '2020-07-24T10:34:47.78',
  deadline: null
}

export const todoApi = {
  getTodolist() {
    return instance.get<Array<TodolistType>>(`todo-lists`)
    // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
  },
  createTodo(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});
  },
  deleteTodo: function (todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },
  updateTodoTitle(todoId: string, newTitle: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, newTitle)
  },


  getTodoTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(todoId: string, taskId: string, newTaskTitle: string) {
    UpdateTask.title = newTaskTitle
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, UpdateTask)
  }

}