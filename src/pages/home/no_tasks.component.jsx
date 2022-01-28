import React from 'react'

import { Button } from '@mui/material'


import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'


// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'



export const NoTasksComponent = ({ showAddTaskForm }) => {
    return (
        <div className='no_tasks_container'>

            <HourglassBottomOutlined fontSize='8' className='no_tasks_container__icon' />
            <VSpacerComponent space={2} />

            <h4> No Tasks </h4>
            <VSpacerComponent space={.5} />

            <p>
                You have not added any tasks yet. Click below button to add one.
            </p>

            <Button
                color='primary'
                onClick={showAddTaskForm}
            > 
                Add Task 
            </Button>

        </div>
    )
}
