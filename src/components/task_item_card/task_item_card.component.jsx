
import clsx from 'clsx'


import DeleteIcon from '@mui/icons-material/Delete'
import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'

import Done from '@mui/icons-material/Done'


import './task_item_card.component.scss'


const TaskItemCardComponent = ({ task, completed, isOngoing, onDelete, onOnGoing, onComplete,  }) => {
    return (
        <div 
            className={
                clsx({
                    'card': true, 
                    'su_6': true, 
                    'card_completed': completed,
                    'card_ongoing': isOngoing,
                })
            }
        >

            {/* text */}
            <p className='card__text fd_14'>
                {task}
            </p>

            <div className='card__actions'>

                {/* delete */}
                <div 
                    className={
                        clsx({
                            'card__actions__icon_button': true, 
                            'card__actions__icon_button__delete': true, 
                            'fd_16': true,
                        })
                    }
                    onClick={onDelete}
                >
                    <DeleteIcon fontSize='4' className='card__actions__icon_button__icon card__actions__icon_button__icon__delete' />
                </div>

                {/* on going */}
                <div
                    className={
                        clsx({
                            'card__actions__icon_button': true, 
                            'card__actions__icon_button__on_going': true,  
                            // 'card__actions__icon_button__on_going__active': isOngoing,
                            'fd_18': true,
                        })
                    }
                    onClick={onOnGoing}
                >
                    <HourglassBottomOutlined 
                        fontSize='4' 
                        className={
                            clsx({
                                'card__actions__icon_button__icon': true, 
                                'card__actions__icon_button__icon__on_going': true, 
                                'card__actions__icon_button__icon__on_going__active': isOngoing,
                                'card__actions__icon_button__icon__active': isOngoing, 
                            })
                        } 
                    />
                </div>
                
                {/* done */}
                <div 
                    className={
                        clsx({
                            'card__actions__icon_button': true, 
                            'card__actions__icon_button__done': true,
                            'card__actions__icon_button__done__active': completed, 
                            'fd_20': true,
                        })
                    }
                    onClick={onComplete}
                >
                    <Done 
                        fontSize='4' 
                        className={
                            clsx({
                                'card__actions__icon_button__icon': true, 
                                'card__actions__icon_button__icon__done': true,
                                'card__actions__icon_button__icon__active': completed, 
                            })
                        } 
                    />
                </div>

            </div>
        </div>
    )
}

export default TaskItemCardComponent
