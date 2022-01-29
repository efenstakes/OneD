import React, { useState, useEffect } from 'react'

import moment from 'moment'
import clsx from 'clsx'


import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AddIcon from '@mui/icons-material/Add'


import { TextField, Button } from '@mui/material'


// components
import HSpacerComponent from '../../components/h_spacer/h_spacer.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TaskItemCardComponent from '../../components/task_item_card/task_item_card.component'
import { NoTasksComponent } from './no_tasks.component'
import { DayEndComponent } from './day_end.component'


import './home.page.scss'



const HomePage = () => {
    let [tasks, setTasks] = useState([])
    let [inEditTask, setInEditTask] = useState('')
    let [onGoingTask, setOnGoingTask] = useState()

    const [isDayEnd, setIsDayEnd] = useState(false)
    

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

        const new_tasks = [
            ...tasks,
            {
                task: inEditTask,
                completed: false,
                active: false,
            }
        ]

        setTasks(new_tasks)
        saveTasksToLS(new_tasks)
        setInEditTask('')
    }// addInEditTask


    // mark task as complete
    const markTaskAsComplete = (task)=> {
        if( task.task === onGoingTask) {
            setOnGoingTask(null)
        }
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                completed: (task.task === tsk.task) ? !tsk.completed : tsk.completed,
            }
        })
        setTasks(new_tasks)
        saveTasksToLS(new_tasks)
    }// markTaskAsComplete

    // mark task as active
    const markTaskAsActive = (task)=> {
        setOnGoingTask(task)
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                active: (task === tsk.task) ? true : false,
                completed: false,
            }
        })
        setTasks(new_tasks)
        saveTasksToLS(new_tasks)
    }// markTaskAsActive

    // mark task as inactive
    const markTaskAsInActive = (task)=> {
        if ( task === onGoingTask ) {
            setOnGoingTask(null)
        }
        const new_tasks = tasks.map((tsk)=> {
            return {
                ...tsk,
                active: task === tsk.task ? false : true,
            }
        })
        setTasks(new_tasks)
        saveTasksToLS(new_tasks)
    }// markTaskAsInActive

    // delete task
    const deleteTask = (task)=> {
        const new_tasks = tasks.filter((tsk)=> tsk.task != task)
        setTasks(new_tasks)
        saveTasksToLS(new_tasks)
    }// deleteTask


    // end my day
    // delete tasks
    // hide ui
    const endMyDay = ()=> {
        setTasks([])
        clearTasksFromLS()
        setIsDayEnd(true)
    }// endMyDay


    // save data to local storage
    const saveTasksToLS = (data)=> {
        localStorage.setItem('oned/data', JSON.stringify(data))
    }

    // get data from local storage
    const getTasksFromLS = ()=> {
        const data = localStorage.getItem('oned/data')
        return data ? JSON.parse(data) : []
    }

    // clear data from local storage
    const clearTasksFromLS = ()=> {
        localStorage.removeItem('oned/data')
    }



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
        const tsks = getTasksFromLS()
        setTasks(tsks)
    }, [ ])

    useEffect(()=> {
        // console.log("addTaskFormTime is ", addTaskFormTime)
        if( addTaskFormTime <= 0 ) {
            clearInterval(addTaskFormTimerRef)
        }
    }, [ addTaskFormTime ])
    


    if ( isDayEnd ) {
        return (
            <DayEndComponent />
        )
    }
    return (
        <div className='page'>

            <VSpacerComponent space={4} />

            {/* time container */}
            <div className='time_container fd_2'>


                {/* time */}
                {
                    currentSeconds === 0 &&
                        <p className='time_container__time fd_12'>
                            00:00
                        </p>           
                }
                {
                    currentSeconds > 0 &&    
                        <p className='time_container__time fd_12'>
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
                        <div className='time_container__current_task fd_15'>
                            <div className='time_container__current_task__indicator__container'>
                                <div 
                                    className={
                                        clsx({
                                            'time_container__current_task__indicator': true, 
                                            'blink_animator': !isPaused && currentSeconds > 0 
                                        })
                                    } 
                                />
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
                    <div className='time_container__actions__icon_button fd_16'>
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
                        className='time_container__actions__icon_button fd_18'
                        onClick={ (currentSeconds > 0) ? stopTimer : null }
                    >
                        <StopIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                    </div>
                    
                    {/* hide or show */}
                    <div 
                        className='time_container__actions__icon_button fd_20'
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

                        <h2 className='su_2'> Tasks </h2>

                        <div className='tasks_header__actions'>

                            {/* add button */}
                            {
                                (!isAddTaskFormShown || addTaskFormTime === 0) &&
                                    <div 
                                        className='tasks_header__actions__add_button fd_4'
                                        onClick={ (!isAddTaskFormShown || addTaskFormTime === 0) ? showAddTaskForm : null }
                                    >
                                        <AddIcon fontSize='4' className='tasks_header__actions__add_button__icon' />
                                    </div>
                            }

                            {/* date */}
                            <div 
                                className='tasks_header__actions__date su_6'
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
                        const isOngoing = task.task === onGoingTask

                        return (
                            <TaskItemCardComponent
                                key={task.task}
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
            
            <VSpacerComponent space={15} />

            {/* add tasks */}
            {
                isAddTaskFormShown && addTaskFormTime > 0 &&
                    <div className='add_tasks_container page'>
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
                                    if(e.code === "Enter") {
                                        addInEditTask()
                                    }
                                }
                            }
                            style={{
                                padding: '0px 12px',
                                borderRadius: '0px',
                            }}
                            className='add_tasks_container__text_input'
                        />
                    </div>
            }
            {
                ((!isAddTaskFormShown || addTaskFormTime === 0) && tasks.length > 0) &&
                    <div className='fab_container'>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={endMyDay}
                            style={{
                                textTransform: 'none',
                                borderRadius: 32,
                                padding: '4px 20px',
                                color: 'white',
                                boxShadow: 'none',
                            }}
                            className='primary_button primary_fab_button su_12'
                        >
                            End My Day 
                        </Button>
                    </div>
            }


        </div>
    )
}

export default HomePage
