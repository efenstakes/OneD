import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'


import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'

import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'


// components
import HSpacerComponent from '../../components/h_spacer/h_spacer.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'



import './time_display.component.scss'


const TimeDisplayComponent = ({ currentSeconds, onGoingTask, isPaused, isFullScreen, setIsFullScreen, startTimer, pauseTimer, resumeTimer, stopTimer, }) => {
    const ref = useRef()
  
    const openFullscreen = ()=> {
        if( !ref || !ref?.current ) {
            console.log("ref is empty")
            return
        }
        console.log("ref.current ", ref.current)
        console.log("ref ", ref)
        if (ref.current.requestFullscreen) {
            console.log("we in biz")
            ref.current.requestFullscreen();
        } else if (ref.current.webkitRequestFullscreen) { /* Safari */
            ref.current.webkitRequestFullscreen();
        } else if (ref.current.msRequestFullscreen) { /* IE11 */
            ref.current.msRequestFullscreen();
        }
    }


    useEffect(() => {
        // if( isFullScreen ) {
        //     ref.current.exitFullScreen()
        // } else {
        //     openFullscreen()
        // }
    }, [ isFullScreen ])
  
   return (
    <div 
        className={
            clsx({
                'time_container': true, 
                'time_container__fullscreen': isFullScreen, 
                'fd_2': true,
            })
        }
        ref={ref}
    >

        {/* time */}
        {
            currentSeconds === 0 &&
                <div className='time_container__time fd_12'>
                    00:00
                </div>           
        }
        {
            currentSeconds > 0 &&    
                <div className='time_container__time fd_12'>
                    {
                        parseInt(currentSeconds/60).toString().padStart(2, '0')
                    }
                    :
                    { 
                        parseInt(currentSeconds%60).toString().padStart(2, '0') 
                    }
                </div>
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
                    <HSpacerComponent space={1.6} />
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
                    ()=> setIsFullScreen(!isFullScreen)
                }
            >
                {
                    isFullScreen && <FullscreenExitIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                }
                {
                    !isFullScreen && <FullscreenIcon fontSize='4' className='time_container__actions__icon_button__icon' />
                }
            </div>

        </div>
        

    </div>
  )
}



TimeDisplayComponent.propTypes = { 
    currentSeconds: PropTypes.number.isRequired, 
    onGoingTask: PropTypes.string, 
    isPaused: PropTypes.bool.isRequired, 
    isFullScreen: PropTypes.bool.isRequired, 
    setIsFullScreen: PropTypes.func.isRequired, 
    startTimer: PropTypes.func.isRequired, 
    pauseTimer: PropTypes.func.isRequired, 
    resumeTimer: PropTypes.func.isRequired, 
    stopTimer: PropTypes.func.isRequired, 
}

export default TimeDisplayComponent
