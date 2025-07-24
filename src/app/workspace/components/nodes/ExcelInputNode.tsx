'use client'
import { SettingOutlined, TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Upload, UploadProps } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useState } from 'react'


const ExcelInputNode = ({ data }: NodeProps) => {
    const sourceHandleStyle: React.CSSProperties = {
        background: '#DCDFE4',
        borderRadius: '0 50% 50% 0',
        scale: '200%',
        border: 'none'
    }

    const drawerButtonStyle: React.CSSProperties = {
        borderRadius: '9999px',
        paddingInline: 8,
        marginBlock: 8,
        marginInline: 'auto'
    }
    const cardStyle: React.CSSProperties = {
        borderRadius: '5px',
        width: 180,
        border: data.isSelected ? 'solid #7472B5 2px' : ''
    }
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
                    <Paragraph style={{ fontSize: '14px', marginInline: '4px' }}>File Input</Paragraph>
                </div>
                <Divider style={{ margin: '0', background: data.isSelected ? '#7472B5' : '' }} />
                <div
                    style={{
                        minHeight: '1rem',
                        backgroundColor: '#F7F8F9',
                        padding: 0,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexGrow: 1
                    }}>
                    <TableOutlined style={{ marginInline: 2, display: data.isSelected ? 'block' : 'none', paddingBlock: '4px' }} />
                    <Handle type='source' style={{ ...sourceHandleStyle, position: 'absolute', right: data.isSelected ? -5 : -3, top: data.isSelected ? 15 : 10 }} position={Position.Right} />
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
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Drawer>
                </Flex>
            </Card >
        </div >
    )
}

export default ExcelInputNode
