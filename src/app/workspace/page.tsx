import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import WorkspaceLayout from './layout/WorkspaceLayout'
import { DnDProvider } from '../context/DnDContext'
import { ConfigProvider } from 'antd'

const Workspace = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ConfigProvider
                theme={{
                    components: {
                        Card : {
                            bodyPadding: 0
                        },
                    }
                }}
            >
                <DnDProvider>
                    <ReactFlowProvider>
                        <WorkspaceLayout />
                    </ReactFlowProvider>
                </DnDProvider>
            </ConfigProvider>
        </div>
    )
}

export default Workspace
