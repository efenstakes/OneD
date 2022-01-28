
import './task_item_card.component.scss'


import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import ReplayIcon from '@mui/icons-material/Replay'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'
import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'

import Done from '@mui/icons-material/Done'




const TaskItemCardComponent = ({ task, completed, isOngoing, onDelete, onOnGoing, onComplete,  }) => {
    return (
        <div className='card'>
            <p className='card__text'>
                {task}
            </p>

            <div className='card__actions'>

                {/* delete */}
                <div 
                    className='card__actions__icon_button card__actions__icon_button__delete'
                    onClick={onDelete}
                >
                    <DeleteIcon fontSize='4' className='card__actions__icon_button__icon card__actions__icon_button__icon__delete' />
                </div>

                {/* on going */}
                <div 
                    className='card__actions__icon_button card__actions__icon_button__on_going'
                    onClick={onOnGoing}
                >
                    <HourglassBottomOutlined fontSize='4' className='card__actions__icon_button__icon card__actions__icon_button__icon__on_going' />
                </div>
                
                {/* done */}
                <div 
                    className='card__actions__icon_button card__actions__icon_button__done'
                    onClick={onComplete}
                >
                    <Done fontSize='4' className='card__actions__icon_button__icon card__actions__icon_button__icon__done' />
                </div>

            </div>
        </div>
    )
}

export default TaskItemCardComponent
