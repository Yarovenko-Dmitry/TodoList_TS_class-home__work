import React from "react";

export default function Header() {
    return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
                <input type="text" placeholder="title"/>
                <button>Add</button>
            </div>
        </div>
    );
}