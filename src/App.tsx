import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./interfaces";
import React, { FC, ChangeEvent, useState } from "react";
const App: FC = () => {
    const [task, setTask] = useState<string>("");
    const [deadline, setDeadLine] = useState<number>(0);
    const [todoList, setTodoList] = useState<ITask[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task") {
            setTask(event.target.value);
            console.log("new");
        } else {
            setDeadLine(Number(event.target.value));
        }
    };
    const addTask = (): void => {
        const newTask = { taskName: task, deadline: deadline };
        setTodoList([...todoList, newTask]);
        setTask("");
        setDeadLine(0);
    };
    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(
            todoList.filter((task) => {
                return task.taskName !== taskNameToDelete;
            })
        );
    };
    return (
        <div className="App">
            <div className="header">
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="Task..."
                        onChange={handleChange}
                        name="task"
                        value={task}
                    />
                    <input
                        type="number"
                        placeholder="Deadline (in Days)..."
                        onChange={handleChange}
                        name="deadline"
                        value={deadline}
                    />
                </div>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="todoList">
                {todoList.map((task: ITask, key: number) => {
                    return (
                        <TodoTask
                            key={key}
                            task={task}
                            completeTask={completeTask}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
