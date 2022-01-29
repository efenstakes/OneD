import React from 'react'

import { Button } from '@mui/material'


import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'
import Add from '@mui/icons-material/Add'



// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'



export const NoTasksComponent = ({ showAddTaskForm }) => {
    return (
        <div className='no_tasks_container'>

            <HourglassBottomOutlined fontSize='8' className='no_tasks_container__icon su_2' />
            <VSpacerComponent space={2} />

            <h4 className='su_8'> No Tasks </h4>
            <VSpacerComponent space={.5} />

            <p className='su_10'>
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
                    textTransform: 'none',
                    borderRadius: 32,
                    padding: '4px 20px'
                }}
                className='su_12'
            >
                Add Task 
            </Button>

        </div>
    )
}
