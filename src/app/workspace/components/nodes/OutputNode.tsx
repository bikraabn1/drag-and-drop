'use client'

import { CarryOutOutlined, DownloadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position, useEdges, useNodesData } from '@xyflow/react'
import { Button, Card, Divider, Flex } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useEffect, useMemo, useState } from 'react'
import { bodyNodeStyle, cardStyle, headerIconNodeStyle, headerNodeStyle, headerTitleNodeStyle, targetHandleStyle } from './node-styles/node-style'
import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'), {
    ssr: false
});

const OutputNode = ({ id }: NodeProps) => {
    const allEdges = useEdges()
    const sourceNodeIds = useMemo(() => {
        const ids = allEdges
            .filter((edges) => edges.target === id)
            .map((edge) => edge.source)

        return ids
    }, [id, allEdges])

    const sourceNodeData = useNodesData(sourceNodeIds)

    useEffect(() => {
        console.log('ini data yang di terima di outputNode',sourceNodeData)
    },[sourceNodeData])
    
    const testJson = {
        "key": "value",
    }

    return (
        <div>
            <Card style={cardStyle}>
                <Flex justify='start' align='center' gap={5} style={headerNodeStyle}>
                    <CarryOutOutlined style={{ ...headerIconNodeStyle, background: '#852FD4' }} />
                    <Paragraph style={headerTitleNodeStyle}>File Output</Paragraph>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <Flex align='flex-end' gap={10} justify='center' vertical style={bodyNodeStyle}>
                    <Card title={"Preview JSON"} style={{ padding: 5 }} size='small'>
                        <ReactJson style={{ fontSize: "12px" }} src={testJson} />
                    </Card>
                    <Button icon={<DownloadOutlined />}>Download</Button>
                </Flex>
                <Handle type='target' style={targetHandleStyle} position={Position.Left} />
            </Card >
        </div>
    )
}

export default OutputNode
