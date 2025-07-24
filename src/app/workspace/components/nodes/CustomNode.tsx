'use client'
import { Handle, Position } from '@xyflow/react'
import { Card } from 'antd'
import React from 'react'

const targetHandleStyle : React.CSSProperties = {
    background: '#DCDFE4',
    borderRadius: '0 50% 50% 0',  
    scale:'200%'
}

const sourceHandleStyle : React.CSSProperties = {
    background: '#DCDFE4',
    borderRadius: '50% 0 0 50%',  
    scale:'200%'
}

const cardStyle: React.CSSProperties = {
    borderRadius: '5px'
}

const CustomNode = () => {

    return (
        <div>
            <Card  style={cardStyle}>
                <h3>Ini Custom Node</h3>
            </Card>
            <Handle type='source' position={Position.Left} style={sourceHandleStyle}/>
            <Handle type='target' position={Position.Right} style={targetHandleStyle}/>
        </div>
    )
}

export default CustomNode
