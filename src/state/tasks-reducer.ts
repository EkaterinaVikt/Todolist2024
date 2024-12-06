// reducer — это функция, которая принимает state и action и возвращает измененный state
// reducer — это чистая функция. Она не имеет права менять то, что к ней пришло (принцип имутабельности). То есть возвращаем копию стэйта с изменениями.
// reducer получает state и инструкцию, action, о том, как этот state изменить. Инструкция-action может содержать доп.данные, нужные для изменения состояния state.

import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {FilterValuesType, TaskStateType, ToDoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

//тип данных, которые возвращает функция, должен совпадать с типом, который она принимает
export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST":{
    const stateCopy = {...state};
    stateCopy[action.todolistId] = [];
    return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete (stateCopy[action.id])
            return stateCopy
        }
        default:
            throw new Error("I don't know this action type")
    }

}

// функция, которая создает action
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    //когда taskId: taskId, т.к. ключ и значение совпадают, то можно писать одним словом
    return {type: "REMOVE-TASK", taskId, todolistId}

}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}


