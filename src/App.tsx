import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles'

export type FilterValuesType = "all" | "completed" | "active";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {

        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filteredTasks;

        setTasks({...tasksObj});

    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}

        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {

        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        // строка выше равна записанному ниже, т.к. выражение в скобках само по себе true, слово
        // return опускаем
        // if (t.id === taskId) {return true}
        // else {return false}
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj});
        }
        ;


    }

    function changeTaskTitle(newTitle: string, id: string) {
        todolists.find(t => t.id === id)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function changeTodolistTitle(newTitle: string, id: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        let todolist: ToDoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<ToDoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        // в квадратных скобках, потому что мы хотим обращаться напрямую к значению, сгенер. v1()
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "NodeJS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},

        ]
    })


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'justify',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={"2"} style={{padding: "2em"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={"2"} style={{padding: "2em"}}>
                    {todolists.map((tl) => {

                        let tasksForTodoList = tasksObj[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                        }

                        return <Item>

                            <ToDoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />

                        </Item>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
