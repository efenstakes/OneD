import React, { useState, useEffect } from 'react'


import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'


// components
import HSpacerComponent from '../../components/h_spacer/h_spacer.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'



import './home.page.scss'



const HomePage = () => {
    let [title, setTitle] = useState()
    let [tasks, setTasks] = useState([])
    let [currentTask, setCurrentTask] = useState()
    

    let [timerRef, setTimerRef] = useState(null)

    let [currentSeconds, setCurrentSeconds] = useState(0)
    let [isPaused, setIsPaused] = useState(false)

    let [isTimeDisplayHidden, setIsTimeDisplayHidden] = useState(false)



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


    useEffect(()=> {
        
    }, [ isPaused, currentSeconds ])
    

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
                <div className='time_container__current_task'>
                    <div className='time_container__current_task__indicator__container'>
                        <div className={ `time_container__current_task__indicator ${(!isPaused && currentSeconds > 0) ? 'blink_animator' : ''}` } />
                    </div>
                    <HSpacerComponent space={1} />
                    <p className='time_container__current_task__title'>
                        Do Something
                    </p>
                </div>

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
                        onClick={stopTimer}
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
            <VSpacerComponent space={4} />
            



        </div>
    )
}

export default HomePage
