import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import WorkspaceLayout from './layout/WorkspaceLayout'
import { DnDProvider } from '../context/DnDContext'

const Workspace = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <DnDProvider>
                <ReactFlowProvider>
                    <WorkspaceLayout />
                </ReactFlowProvider>
            </DnDProvider>
        </div>
    )
}

export default Workspace
