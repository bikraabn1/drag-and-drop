'use client'

import { DownloadOutlined, FileExcelFilled, SettingOutlined, TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Upload } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useState } from 'react'
import { cardStyle, drawerButtonStyle, targetHandleStyle } from './node-styles/node-style'

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
                <div style={{ padding: '4px', display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                    <Paragraph style={{ fontSize: '14px', marginInline: '4px' }}>Output</Paragraph>
                </div>
                <Divider style={{ margin: '0', background: data.isSelected ? '#7472B5' : '' }} />
                <div
                    style={{
                        minHeight: '1rem',
                        backgroundColor: '#F0F0F0',
                        padding: 0,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexGrow: 1
                    }}>
                    <FileExcelFilled style={{ marginInline: 2, display: data.isSelected ? 'block' : 'none', paddingBlock: '4px' }} />
                    <Handle type='target' style={{ ...targetHandleStyle, position: 'absolute', left: data.isSelected ? -6 : -4, top: data.isSelected ? 15 : 10 }} position={Position.Left} />
                </div>
                <Divider style={{ margin: 0, background: data.isSelected ? '#7472B5' : '' }} />
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
            </Card >
        </div>
    )
}

export default OutputNode
