'use client'

import { CarryOutOutlined, DownloadOutlined, FileExcelFilled, SettingOutlined, TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Upload } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useState } from 'react'
import { cardStyle, drawerButtonStyle, headerIconNodeStyle, headerNodeStyle, headerTitleNodeStyle, targetHandleStyle } from './node-styles/node-style'

const OutputNode = ({ data }: NodeProps) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card style={cardStyle}>
                <Flex justify='start' align='center' gap={5} style={headerNodeStyle}>
                    <CarryOutOutlined style={{ ...headerIconNodeStyle, background: '#852FD4' }} />
                    <Paragraph style={headerTitleNodeStyle}>File Output</Paragraph>
                </Flex>
                <Divider style={{ margin: 0}} />
                <Flex align='center' justify='center'>
                    <Button style={drawerButtonStyle} onClick={showDrawer}>
                        <SettingOutlined />
                    </Button>
                    <Drawer
                        closable={{ 'aria-label': 'Close Button' }}
                        onClose={onClose}
                        open={open}
                    >
                        <Upload accept='xls, xlsx, csv'>
                            <Button icon={<DownloadOutlined />}>Download</Button>
                        </Upload>
                    </Drawer>
                </Flex>
                <Handle type='target' style={targetHandleStyle} position={Position.Left} />
            </Card >
        </div>
    )
}

export default OutputNode
