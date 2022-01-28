import React from 'react'

import { Button } from '@mui/material'


import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'
import Add from '@mui/icons-material/Add'



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
            <VSpacerComponent space={2} />

            <Button
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Add />}
                onClick={showAddTaskForm}
                style={{
                    textTransform: 'none'
                }}
            > 
                Add Task 
            </Button>

        </div>
    )
}
