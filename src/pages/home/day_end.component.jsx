import React from 'react'


import HourglassFull from '@mui/icons-material/HourglassFull'


// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'


import './day_end.component.scss'



export const DayEndComponent = () => {
    return (
        <div className="page_day_end">
            
            <HourglassFull fontSize='8' className='page_day_end__icon su_2' />
            <VSpacerComponent space={2} />

            <h2 className='su_8'> Hooray! </h2>
            <VSpacerComponent space={.5} />

            <p className='su_10'>
                You're done with your day. See you next time.
            </p>
            <VSpacerComponent space={2} />

        </div>
    )
}
