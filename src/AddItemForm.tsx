import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormType = {
    addItem: (title: string ) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter" && newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {

        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        ;

        props.addItem(newTaskTitle.trim() )
        setNewTaskTitle("")
    }


    return <div>
        <TextField
            id={"standard-basic"} label={"Введите задачу"} variant={"outlined"}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask}  color={"primary"} >
            <AddCircleOutlineIcon/>
        </IconButton>

    </div>
}