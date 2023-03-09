import React, { FC, useState } from 'react';
import './App.css';
import { Title } from './components/Title';
import InputForm from './components/InputForm';
import TodolistPrint from './components/TodolistPrint';

export type TodoList = {
    data: string;
    id: number;
    completed: boolean;
}




function App() {
    const [taskList, setTaskList] = useState<TodoList[]>([]);
    const updateTaskList = (taskText: string): void => {
        const newTodos: TodoList[] = [...taskList, { data: taskText, completed: false, id: taskList.length }]
        setTaskList(newTodos);
        console.log(taskList);
    };

    const handleDelete = (id: number) => {
        // タスクを削除
        // filter関数で taskListを回して 式がfalseになったときに除外する。
        // idが 違かった場合にtrueとなる。
        setTaskList(taskList.filter((task) => task.id !== id));
    };

    const handoleCompleted = (id: number) => {
        // 取り消し線を追加する
        setTaskList(taskList.map((task) => {
            if (id === task.id) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            else {
                return task;
            }
        }));

    };

    const showTask = taskList.map((task, idx) => {
        return (
            <div key={idx} className='todoList'>
                <div className='todos'>
                    <div className={`todo ${task.completed ? "completed" : ""}`} key={idx}>

                        <div className='todoText'>
                            <TodolistPrint task={task} key={idx} />

                        </div>
                        <div className='icons'>
                            <button onClick={() => handoleCompleted(task.id)}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button onClick={() => handleDelete(task.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });


    return (

        <div className='body'>
            <Title />
            <InputForm updateTaskList={updateTaskList} />
            {/* <TodolistPrint taskList={taskList} /> */}
            {showTask}
        </div>
    );
}

export default App;