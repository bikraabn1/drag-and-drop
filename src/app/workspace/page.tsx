import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import WorkspaceLayout from './layout/WorkspaceLayout'
import { ConfigProvider } from 'antd'

const Workspace = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ConfigProvider
                theme={{
                    components: {
                        Card: {
                            bodyPadding: 0,
                        },
                    },
                }}
            >
                <ReactFlowProvider>
                    <WorkspaceLayout />
                </ReactFlowProvider>
            </ConfigProvider>
        </div>
    )
}

export default Workspace
