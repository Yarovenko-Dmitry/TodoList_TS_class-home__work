import Header from "./Header/Header";
import List from "./List/List";
import Footer from "./Footer/Footer";
import React from "react";
import styles from '../common/Input/style.module.css';

export default function TodoList() {
    return (
        <div className={styles.todolist}>
            <Header/>
            <List/>
            <Footer/>
        </div>
    );
}