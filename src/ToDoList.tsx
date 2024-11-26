import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType> //то же, что и tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

function DeleteIcon() {
    return null;
}

export function ToDoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(newTitle, props.id)


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete />
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {

                            const onRemoveClick = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)

                            }
                            return <div className={t.isDone ? "is-done" : ""} key={t.id}>

                                <Checkbox
                                    color="success"
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={t.title} onChange={
                                    onChangeTitleHandler
                                }/>
                                <IconButton aria-label="delete" onClick={onRemoveClick}>
                                    <Delete />
                                </IconButton>

                            </div>
                        }
                    )
                }


            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"success"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}
