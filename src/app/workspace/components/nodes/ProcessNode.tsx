'use client'

import React, { useState } from 'react'
import { FileTextFilled, PlayCircleFilled, ScheduleFilled, SettingOutlined, TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Select, Upload } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { cardStyle, drawerButtonStyle, sourceHandleStyle, targetHandleStyle } from './node-styles/node-style'

const ProcessNode = ({ data }: NodeProps) => {
    
    const [open, setOpen] = useState<string | null>(null);

    const showDrawer = (drawerIdentifier : string) => {
        setOpen(drawerIdentifier);
    };

    const onClose = () => {
        setOpen(null);
    };

    return (
        <div>
            <Card style={{...cardStyle, border : data.isSelected ? 'solid #7472B5 2px' : ''  }}>
                <div style={{ padding: '4px', display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                    <Paragraph style={{ fontSize: '14px', marginInline: '4px' }}>Process</Paragraph>
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
                    <TableOutlined style={{ marginInline: 2, display: data.isSelected ? 'block' : 'none', paddingBlock: '4px' }} />
                    <Handle type='target' style={{ ...targetHandleStyle, position: 'absolute', left: data.isSelected ? -6 : -4, top: data.isSelected ? 15 : 10 }} position={Position.Left} />
                </div>
                <Divider style={{ margin: 0, background: data.isSelected ? '#7472B5' : '' }} />
                <div
                    style={{
                        minHeight: '1rem',
                        backgroundColor: '#F0F0F0',
                        padding: 0,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexGrow: 1
                    }}>
                    <ScheduleFilled style={{ marginInline: 2, display: data.isSelected ? 'block' : 'none', paddingBlock: '4px' }} />
                    <Handle type='source' style={{ ...sourceHandleStyle, position: 'absolute', right: data.isSelected ? -5 : -3, top: data.isSelected ? 15 : 10 }} position={Position.Right} />
                </div>
                <Divider style={{ margin: 0, background: data.isSelected ? '#7472B5' : '' }} />
                <Flex align='center' justify='center' gap={5}>
                    <Button style={drawerButtonStyle} onClick={() => showDrawer('settings')}>
                        <SettingOutlined />
                    </Button>
                    <Drawer
                        closable={{ 'aria-label': 'Close Button' }}
                        onClose={onClose}
                        open={open === 'settings'}
                    >
                        <h3>Set Process</h3>
                        <Select style={{width: '100%', marginTop: 10}}>
                            <Select.Option>Filter</Select.Option>
                            <Select.Option>Sort By</Select.Option>
                        </Select>
                    </Drawer>
                    <Button style={drawerButtonStyle} onClick={() => showDrawer('preview')}>
                        <FileTextFilled />
                    </Button>
                    <Drawer
                        closable={{ 'aria-label': 'Close Button' }}
                        onClose={onClose}
                        open={open === 'preview'}
                    >
                        <Upload accept='xls, xlsx, csv'>
                            <Flex gap={5}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Flex>
                        </Upload>
                    </Drawer>
                </Flex>
            </Card >
        </div>
    )
}

export default ProcessNode
