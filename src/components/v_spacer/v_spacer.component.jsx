import React from 'react'

const VSpacerComponent = ({ space = 1 }) => {
    return (
        <div style={{ height: `${space * 8}px` }} />
    )
}

export default VSpacerComponent
