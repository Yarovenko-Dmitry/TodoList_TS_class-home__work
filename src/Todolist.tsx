import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks?: Array<TaskType>
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
  console.log('Todolist is called')

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

  const addTask = useCallback((title: string) => {
      props.addTask(title, props.id);
    }
    , [props.addTask, props.id]);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(props.id, title);
  }, [props.id, props.changeTodolistTitle]);

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

  if (props.filter === "active") {
    tasks = tasks.filter(t => t.isDone === false);
  }

  if (props.filter === "active") {
    tasks = tasks.filter(t => t.isDone === false);
  }

  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasks.map(t => <Task
            key={props.id}
            changeTaskStatus={props.changeTaskStatus}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            task={t}
            todolistId={props.id}
          />
        )
      }
    </div>
    <div style={{paddingTop: "10px"}}>
      <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'default'}
      >All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}
      >Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}
      >Completed
      </Button>
    </div>
  </div>
})


