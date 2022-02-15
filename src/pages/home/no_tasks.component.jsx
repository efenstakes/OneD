import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'


import HourglassBottomOutlined from '@mui/icons-material/HourglassBottomOutlined'
import Add from '@mui/icons-material/Add'



// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'


import './no_tasks.component.scss'



export const NoTasksComponent = ({ showAddTaskForm }) => {
    return (
        <div className='no_tasks_container'>

            <HourglassBottomOutlined fontSize='8' className='no_tasks_container__icon' />
            <VSpacerComponent space={2.5} />

            <h2 className='su_8'> No Tasks </h2>
            <VSpacerComponent space={.5} />

            <p className='su_10'>
                You have not added any tasks yet. Click below button to add one.
            </p>
            <VSpacerComponent space={2.5} />

            <Button
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Add fontSize='20' />}
                onClick={showAddTaskForm}
                style={{
                    textTransform: 'none',
                    borderRadius: 32,
                    padding: '.4rem 1.6rem',
                    color: 'white',
                    boxShadow: 'none',
                }}
                className='primary_button add_task_button su_12'
            >
                Add Task 
            </Button>

        </div>
    )
}

NoTasksComponent.propTypes = {
    showAddTaskForm: PropTypes.func.isRequired,
}