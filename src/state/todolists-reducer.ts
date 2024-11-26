// reducer — это функция, которая принимает state и action и возвращает измененный state
// reducer — это чистая функция. Она не имеет права менять то, что к ней пришло (принцип имутабельности). То есть возвращаем копию стэйта с изменениями.
// reducer получает state и инструкцию, action, о том, как этот state изменить. Инструкция-action может содержать доп.данные, нужные для изменения состояния state.

import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";


// Action — это объект, у которого обязательно есть тип

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type:'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST": {
            let filteredTodolists = state.filter(tl => tl.id !== action.id);
            return filteredTodolists;
        }

        case "ADD-TODOLIST": {

            return [...state,
                {
                    id: v1(),
                    filter: "all",
                    title: action.title
                }
            ]
        }

        case "CHANGE-TODOLIST-TITLE":   {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }

            return [...state]
        }

case "CHANGE-TODOLIST-FILTER": {
    let todolist = state.find(tl => tl.id === action.id)
    if (todolist) {
        todolist.filter = action.filter
    }
    return [...state]
}


        default:
            throw new Error("I don't know this action type")
    }

}

// функция, которая создает action
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}

}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType  => {
   return {
       type: 'CHANGE-TODOLIST-FILTER',
       id: id,
       filter: filter
   }
}