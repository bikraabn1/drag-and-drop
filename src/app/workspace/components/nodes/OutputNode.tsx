'use client'

import { CarryOutOutlined, DownloadOutlined, FileExcelFilled, SettingOutlined, TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Select, Upload } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useState } from 'react'
import { bodyNodeStyle, cardStyle, drawerButtonStyle, headerIconNodeStyle, headerNodeStyle, headerTitleNodeStyle, targetHandleStyle } from './node-styles/node-style'
import ReactJson from 'react-json-view'

const OutputNode = ({ data }: NodeProps) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleChange = (value: any) => {
        console.log(value);
    }

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
                <Flex align='center' justify='center' style={bodyNodeStyle}>
                    <Card title={"Preview JSON"} style={{padding:5}} size='small'>
                        <ReactJson src={testJson}/>
                    </Card>
                </Flex>
                <Handle type='target' style={targetHandleStyle} position={Position.Left} />
            </Card >
        </div>
    )
}

export default OutputNode
