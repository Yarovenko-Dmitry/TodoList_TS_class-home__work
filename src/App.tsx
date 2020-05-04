import React from 'react';
import styles from './App.module.css';
import TodoList from './components/Todolist/Todolist'

function App() {
    return (
        <div className={styles.App}>
            <TodoList/>
            <TodoList/>
            <TodoList/>
        </div>
    );
}

export default App;
