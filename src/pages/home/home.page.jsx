import React, { useState } from 'react'
import HSpacerComponent from '../../components/h_spacer/h_spacer.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'

import IconButton from '@mui/material/IconButton'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'


import './home.page.scss'



const HomePage = () => {
    const [title, setTitle] = useState()
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState()

    const [seconds, setSeconds] = useState(0)
    const [currentseconds, setCurrentSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const [isTimeDisplayHidden, setIsTimeDisplayHidden] = useState(false)

    

    return (
        <div className='page'>

            <VSpacerComponent space={4} />

            {/* time container */}
            <div className='time_container'>


                {/* time */}
                <h1 className='time_container__time'>
                    00:00
                </h1>
                
                {/* current task */}
                <div className='time_container__current_task'>
                    <div className='time_container__current_task__indicator' />
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
                        <DeleteIcon fontSize='2' />
                    </div>

                    {/* stop */}
                    <div className='time_container__actions__icon_button'>
                        <StopIcon fontSize='2' />
                    </div>
                    
                    {/* hide or show */}
                    <div 
                        className='time_container__actions__icon_button'
                        onClick={
                            ()=> setIsTimeDisplayHidden(!isTimeDisplayHidden)
                        }
                    >
                        {
                            isTimeDisplayHidden && <VisibilityOffIcon />
                        }
                        {
                            !isTimeDisplayHidden && <RemoveRedEyeIcon />
                        }
                    </div>

                </div>
                

            </div>

            
            <VSpacerComponent space={4} />



        </div>
    )
}

export default HomePage
