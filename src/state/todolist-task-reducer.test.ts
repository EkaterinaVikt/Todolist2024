import {TaskStateType, ToDoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";

test("ids should be equals", ()=>{
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<ToDoListType> = []

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId);
})