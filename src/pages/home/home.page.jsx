import React, { useState, useEffect } from 'react'

import moment from 'moment'


import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'
import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'
import AddIcon from '@mui/icons-material/Add'


import { TextField, Button } from '@mui/material'


// components
import HSpacerComponent from '../../components/h_spacer/h_spacer.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TaskItemCardComponent from '../../components/task_item_card/task_item_card.component'
import { NoTasksComponent } from './no_tasks.component'



import './home.page.scss'



const HomePage = () => {
    let [title, setTitle] = useState()
    let [tasks, setTasks] = useState([])
    let [inEditTask, setInEditTask] = useState('')
    let [onGoingTask, setOnGoingTask] = useState()
    

    let [timerRef, setTimerRef] = useState(null)

    let [currentSeconds, setCurrentSeconds] = useState(0)
    let [isPaused, setIsPaused] = useState(false)

    let [isTimeDisplayHidden, setIsTimeDisplayHidden] = useState(false)

    let [isAddTaskFormShown, setIsAddTaskFormShown] = useState(false)
    let [addTaskFormTime, setAddTaskFormTime] = useState(0)
    let [addTaskFormTimerRef, setAddTaskFormTimerRef] = useState(null)



    const startTimer = ()=> {
        console.log("start timer")
        let ref = setInterval(()=> setCurrentSeconds(currentSeconds++), 1000)
        setTimerRef(ref)
    }// startTimer
    
    const pauseTimer = ()=> {
        console.log("pause timer")
        setIsPaused(true)
        clearInterval(timerRef)
        setTimerRef(null)
    }// pauseTimer

    const resumeTimer = ()=> {
        console.log("resume timer")
        setIsPaused(false)
        startTimer()
    }// resumeTimer

    const stopTimer = ()=> {
        console.log("stop timer")
        clearInterval(timerRef)
        setTimerRef(null)

        setCurrentSeconds(0)
        setIsPaused(false)
    }// stopTimer


    const addInEditTask = ()=> {
        console.log("add addInEditTask")
        if( inEditTask.length < 2 ) return

        setTasks((state)=> {
            return [
                ...state,
                {
                    task: inEditTask,
                    completed: false,
                    active: false,
                }
            ]
        })
        setInEditTask('')
    }// addInEditTask


    // mark task as complete
    const markTaskAsComplete = (task)=> {
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                completed: !tsk.completed,
            }
        })
        setTasks(new_tasks)
    }// markTaskAsComplete

    // mark task as active
    const markTaskAsActive = (task)=> {
        setOnGoingTask(task)
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                active: task == tsk.task ? true : false,
            }
        })
        setTasks(new_tasks)
    }// markTaskAsActive

    // mark task as inactive
    const markTaskAsInActive = (task)=> {
        setOnGoingTask(null)
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                active: task == tsk.task ? false : true,
            }
        })
        setTasks(new_tasks)
    }// markTaskAsInActive

    // delete task
    const deleteTask = (task)=> {
        const new_tasks = tasks.filter((tsk)=> tsk.task != task)
        setTasks(new_tasks)
    }// deleteTask



    const startAddTaskTimer = ()=> {
        setIsAddTaskFormShown(true)
        setAddTaskFormTime(8)

        addTaskFormTimerRef && clearInterval(addTaskFormTimerRef)

        let ref = setInterval(
                    ()=> {
                        // console.log("running startAddTaskTimer ", addTaskFormTime)
                        setAddTaskFormTime((state)=> {
                            return state <= 0 ? 0 : state - 1
                        })
                    }, 
                    1000
                  )
        setAddTaskFormTimerRef(ref)
    }// startAddTaskTimer

    const showAddTaskForm = ()=> {
        startAddTaskTimer()
    }// showAddTaskForm


    useEffect(()=> {
        
    }, [ isPaused, currentSeconds ])

    useEffect(()=> {
        // console.log("addTaskFormTime is ", addTaskFormTime)
        if( addTaskFormTime <= 0 ) {
            clearInterval(addTaskFormTimerRef)
        }
    }, [ addTaskFormTime ])
    

    return (
        <div className='page'>

            <VSpacerComponent space={4} />

            {/* time container */}
            <div className='time_container'>


                {/* time */}
                {
                    currentSeconds === 0 &&
                        <p className='time_container__time'>
                            00:00
                        </p>           
                }
                {
                    currentSeconds > 0 &&    
                        <p className='time_container__time'>
                            {
                                parseInt(currentSeconds/60).toString().padStart(2, '0')
                            }:{""}
                            { 
                                parseInt(currentSeconds%60).toString().padStart(2, '0') 
                            }
                        </p>
                }
                
                {/* current task */}
                {
                    onGoingTask &&
                        <div className='time_container__current_task'>
                            <div className='time_container__current_task__indicator__container'>
                                <div className={ `time_container__current_task__indicator ${(!isPaused && currentSeconds > 0) ? 'blink_animator' : ''}` } />
                            </div>
                            <HSpacerComponent space={1} />
                            <p className='time_container__current_task__title'>
                                { onGoingTask }
                            </p>
                        </div>
                }

                <VSpacerComponent space={4} />

                {/* actions */}
                <div className="time_container__actions">

                    {/* pause/play */}
                    <div className='time_container__actions__icon_button'>
                        {
                            (!isPaused && currentSeconds > 0) &&
                                <PauseIcon
                                    fontSize='2' 
                                    className='time_container__actions__icon_button__icon'
                                    onClick={pauseTimer}
                                />
                        }
                        {
                            (isPaused && currentSeconds > 0) &&
                                <PlayArrowIcon 
                                    fontSize='2' 
                                    className='time_container__actions__icon_button__icon' 
                                    onClick={resumeTimer}
                                />
                        }
                        {
                            currentSeconds === 0 && 
                                <PlayArrowIcon 
                                    fontSize='2' 
                                    className='time_container__actions__icon_button__icon' 
                                    onClick={startTimer}
                                />
                        }
                    </div>

                    {/* stop */}
                    <div 
                        className='time_container__actions__icon_button'
                        onClick={ (currentSeconds > 0) ? stopTimer : null }
                    >
                        <StopIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                    </div>
                    
                    {/* hide or show */}
                    <div 
                        className='time_container__actions__icon_button'
                        onClick={
                            ()=> setIsTimeDisplayHidden(!isTimeDisplayHidden)
                        }
                    >
                        {
                            isTimeDisplayHidden && <VisibilityOffIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                        }
                        {
                            !isTimeDisplayHidden && <RemoveRedEyeIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                        }
                    </div>

                </div>
                

            </div>
            <VSpacerComponent space={8} />
            
            
            {/* tasks */}
            {
                tasks.length > 0 &&
                    <div className='tasks_header'>
                        <h5> Tasks </h5>

                        <div className='tasks_header__actions'>

                            {/* add button */}
                            {
                                (!isAddTaskFormShown || addTaskFormTime == 0) &&
                                    <div 
                                        className='tasks_header__actions__add_button'
                                        onClick={ (!isAddTaskFormShown || addTaskFormTime == 0) ? showAddTaskForm : null }
                                    >
                                        <AddIcon fontSize='4' className='tasks_header__actions__add_button__icon' />
                                    </div>
                            }

                            {/* date */}
                            <div 
                                className='tasks_header__actions__date'
                                onClick={ (currentSeconds > 0) ? stopTimer : null }
                            >
                                { moment().format("Do MMM") }
                            </div>


                        </div>
                    </div>
            }
            {
                tasks.length > 0 && <VSpacerComponent space={1} />
            }
            <div className='tasks_container'>
                {
                    tasks.map((task)=> {
                        const isOngoing = task.task == onGoingTask

                        return (
                            <TaskItemCardComponent
                                task={task.task}
                                completed={task.completed}
                                isOngoing={isOngoing}
                                onComplete={
                                    ()=> markTaskAsComplete(task)
                                }
                                onOnGoing={
                                    ()=> isOngoing 
                                            ? markTaskAsInActive(task.task) 
                                            : markTaskAsActive(task.task)
                                }
                                onDelete={
                                    ()=> deleteTask(task.task)
                                }
                            />
                        )
                    })
                }
            </div>
            {
                tasks.length === 0 &&
                    <NoTasksComponent showAddTaskForm={showAddTaskForm} />
            }
            
            <VSpacerComponent space={10} />

            {/* add tasks */}
            {
                isAddTaskFormShown && addTaskFormTime > 0 &&
                    <div className='add_tasks_container'>
                        <TextField
                            value={inEditTask}
                            placeholder='Enter task name...'
                            onChange={
                                (v)=> {
                                    startAddTaskTimer()
                                    setInEditTask(v.target.value)
                                }
                            }
                            onKeyDown={
                                (e)=> {
                                    if(e.code == "Enter") {
                                        addInEditTask()
                                    }
                                }
                            }
                            className='add_tasks_container__text_input'
                        />
                    </div>
            }


        </div>
    )
}

export default HomePage
