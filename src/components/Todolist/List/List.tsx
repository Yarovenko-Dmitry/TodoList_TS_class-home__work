import React from "react";
import styles from './style.module.css';
import {inspect} from "util";

export default function List() {
    return (
        <div className={styles.list}>
            <div className={styles.task}>
                <input type="checkbox" checked={true}/>
                <span>CSS</span>
            </div>
            <div className={styles.task}>
                <input type="checkbox" checked={false}/>
                <span>JS</span>
            </div>
            <div className={styles.task}>
                <input type="checkbox" checked={false}/>
                <span>ReactJS</span>
            </div>
            <div className={styles.task}>
                <input type="checkbox" checked={true}/>
                <span>Patterns</span>
            </div>
        </div>
    );
}