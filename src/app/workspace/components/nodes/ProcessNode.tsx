'use client'

import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { SlidersOutlined } from '@ant-design/icons'
import { Handle, Node, NodeProps, Position, useEdges, useNodesData, useReactFlow } from '@xyflow/react'
import { Card, Checkbox, Divider, Flex, Radio, Select } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { cardStyle, headerNodeStyle, headerTitleNodeStyle, sourceHandleStyle, targetHandleStyle, headerIconNodeStyle, bodyNodeStyle, bodyTitleNodeStyle, bodyLabelSelector } from './node-styles/node-style'

export type ExcelInputNodeData = {
    data?: Array<Record<string, any>>
    fileName?: string
}

const ProcessNode = ({ id }: NodeProps) => {
    const [isOpen, setIsOpen] = useState<string>('')

    const handleChangeProcessMethod = (value: string) => {
        setIsOpen(value)
    }

    const allEdges = useEdges()
    const sourceNodeIds = useMemo(() => {
        const ids = allEdges
            .filter((edges) => edges.target === id)
            .map((edge) => edge.source)

        return ids
    }, [id, allEdges])

    const sourceNodeData = useNodesData(sourceNodeIds) as Node<ExcelInputNodeData>[]

    const columnHeader = useMemo(() => {
        if (sourceNodeData && sourceNodeData.length > 0) {
            const firstDataOnConnectedNode = sourceNodeData[0]
            if (firstDataOnConnectedNode && firstDataOnConnectedNode.data) {
                const headersData = firstDataOnConnectedNode.data.data?.[0]
                const headers = headersData ? Object.keys(headersData) : []

                return headers?.map(header => ({
                    label: header,
                    value: header
                }))
            }
        }
    }, [sourceNodeData, sourceNodeIds])

    return (
        <div>
            <Card style={cardStyle}>
                <Flex justify='start' align='center' gap={5} style={headerNodeStyle}>
                    <SlidersOutlined style={{ ...headerIconNodeStyle, background: '#CC1B42' }} />
                    <Paragraph style={headerTitleNodeStyle}>Process</Paragraph>
                </Flex>

                <Divider style={{ margin: '0' }} />

                <Flex align='flex-start' style={bodyNodeStyle} vertical gap={5}>
                    <h3 style={bodyTitleNodeStyle}>Select Process</h3>
                    <Select
                        className='nodrag'
                        styles={{ root: { width: '100%', marginBottom: 10 } }}
                        onChange={handleChangeProcessMethod}
                        options={[
                            { value: 'filter', label: 'filter' },
                            { value: 'sort', label: 'sort' }
                        ]}
                    />
                    {isOpen !== '' ? (
                        isOpen === 'sort' ? (
                            <div style={{ width: "100%" }}>
                                <h3 style={bodyTitleNodeStyle}>Sort By</h3>
                                <Select
                                    styles={{ root: { width: '100%' } }}
                                    className='nodrag'
                                    options={columnHeader}
                                />
                            </div>
                        ) : columnHeader && columnHeader.length > 0
                            ? ( 
                                <div style={{ width: "100%" }}>
                                    <h3 style={bodyTitleNodeStyle}>Filter</h3>
                                    <Checkbox.Group
                                        options={columnHeader}
                                        onChange={(value) => console.log(value)}
                                        style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}
                                    />

                                </div>
                            ) : (
                                <Checkbox defaultChecked={false} disabled={true}>
                                    No Data Inputted
                                </Checkbox>
                            )
                    ) : (
                        <div></div>
                    )
                    }
                </Flex>

                <Handle type='target' style={targetHandleStyle} position={Position.Left} />
                <Handle type='source' style={sourceHandleStyle} position={Position.Right} />
            </Card >
        </div>
    )
}

export default ProcessNode
