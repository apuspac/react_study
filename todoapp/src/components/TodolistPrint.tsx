import React, { FC } from 'react'
import { takeCoverage } from 'v8';

type TodoList = {
    data: string;
    completed: boolean;
}
const TodolistPrint: FC<{ task: TodoList }> = ({ task }) => {
    return (
        <span>{task.data}</span>

    )

}
// const TodolistPrint: FC<{ taskList: TodoList[] }> = ({ taskList }) => {
//     const showTask = taskList.map((task, idx) => (
//         <div className='todo'>
//             <div className='todoText'>
//                 <span key={idx.toString()}>{task.data}</span>
//             </div>
//             <div className='icons'>
//                 <button>
//                     <i className="fa-solid fa-check"></i>
//                 </button>
//                 <button>
//                     <i className="fa-solid fa-trash"></i>
//                 </button>
//             </div>
//         </div>
//     ));


//     return (
//         <div className='todoList'>
//             <div className='todos'>
//                 {showTask}
//             </div>

//         </div>
//     )


// }

export default TodolistPrint;
