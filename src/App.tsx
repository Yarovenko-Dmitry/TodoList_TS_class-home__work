import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'activ' | 'completed' ;

function App() {

  let [tasks, setTask] = useState(
    [
      {id: 1, title: "HTML&CSS", isDone: true},
      {id: 2, title: "JS", isDone: true},
      {id: 3, title: "ReactJS", isDone: false},
      {id: 4, title: "Reast API", isDone: false},
      {id: 5, title: "GraphQL", isDone: false}
    ]
  );

  let tasksForTodoList = tasks;

  let [filter, setFilter] = useState<FilterValuesType>('all');

  if (filter === 'activ') {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }
  ;

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  ;

  let changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  };

  // function changeFilter (value: 'all' | 'activ' | 'completed') {
  //   setFilter(value)
  // };

  let removeTask = (id: number) => {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTask(filteredTasks);
  };


  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
