// reducer — это функция, которая принимает state и action и возвращает измененный state
// reducer — это чистая функция. Она не имеет права менять то, что к ней пришло (принцип имутабельности). То есть возвращаем копию стэйта с изменениями.

import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type StateType = {
    age: number
    childrenCount: number
    name: string
}

// Action — это объект, у которого обязательно есть тип

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: any):StateType => {
    switch (action.type) {
        case "INCREMENT-AGE": {
            let newState = {...state}
            newState.age = state.age + 1;
            return newState;
        }

        case "INCREMENT-CHILDREN-COUNT": {
            return {...state,
                childrenCount:  state.childrenCount + 1}

        }

        case "CHANGE-NAME": {
            return {...state,
            name: action.newName}
        }

        default:
            throw new Error("I don't know this action type")
    }

}