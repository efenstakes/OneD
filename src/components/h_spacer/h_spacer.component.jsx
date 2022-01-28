import React from 'react'

const HSpacerComponent = ({ space = 1 }) => {
    return (
        <div style={{ width: `${space * 8}px` }} />
    )
}

export default HSpacerComponent
