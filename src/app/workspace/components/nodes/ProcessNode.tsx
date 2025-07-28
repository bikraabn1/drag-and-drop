'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { SlidersOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position, useEdges, useNodesData } from '@xyflow/react'
import { Card, Divider, Flex, Select } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { cardStyle, headerNodeStyle, headerTitleNodeStyle, sourceHandleStyle, targetHandleStyle, headerIconNodeStyle, bodyNodeStyle, bodyTitleNodeStyle } from './node-styles/node-style'

const ProcessNode = ({ id }: NodeProps) => {
    const allEdges = useEdges()
    const sourceNodeIds = useMemo(() => {
        const ids = allEdges
            .filter((edges) => edges.target === id)
            .map((edge) => edge.source)

        return ids
    }, [id, allEdges])

    const sourceNodeData = useNodesData(sourceNodeIds)

    


    return (
        <div>
            <Card style={cardStyle}>
                <Flex justify='start' align='center' gap={5} style={headerNodeStyle}>
                    <SlidersOutlined style={{ ...headerIconNodeStyle, background: '#CC1B42' }} />
                    <Paragraph style={headerTitleNodeStyle}>Process</Paragraph>
                </Flex>

                <Divider style={{ margin: '0' }} />

                <Flex align='flex-start' style={bodyNodeStyle} vertical gap={5}>
                    <h3 style={bodyTitleNodeStyle}>Set Process</h3>
                    <Select style={{ width: '100%', marginTop: 10 }}>
                        <Select.Option key="filter">Filter</Select.Option>
                        <Select.Option key="sort-by">Sort By</Select.Option>
                    </Select>
                </Flex>
                <Handle type='target' style={targetHandleStyle} position={Position.Left} />
                <Handle type='source' style={sourceHandleStyle} position={Position.Right} />
            </Card >
        </div>
    )
}

export default ProcessNode
