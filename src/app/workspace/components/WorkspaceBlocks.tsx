'use client'
import React, { useState } from 'react';
import { Button, Drawer, Flex } from 'antd';

interface WorkspaceBlocksProps {
    addNode: (nodeType: string, label: string) => void
}

type nodeButton = {
    nodeLabel: string,
    buttonText: string,
    type: string
}

const blocksFlexStyle : React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 6,
}

const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: 9999,
    pointerEvents: 'none'
};

const NodeButtons : nodeButton[] = [
    {
        nodeLabel: 'Excel Input Node',
        buttonText: 'input node',
        type: 'inputNode',
    },
    {
        nodeLabel: 'Process Node',
        buttonText: 'process node',
        type: 'processNode',
    },
    {
        nodeLabel: 'Output Node',
        buttonText: 'output node',
        type: 'outputNode',
    },
]

const WorkspaceBlocks = ({ addNode }: WorkspaceBlocksProps) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div style={containerStyle}>
            <Button type="primary" onClick={showDrawer} style={{ height: 'auto', pointerEvents: 'auto', padding: '0.5rem 2rem', margin: '1rem', borderRadius: '9999px' }}>
                Blocks
            </Button>
            <Drawer
                title="Blocks"
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                style={{ zIndex: open ? 20 : -1, pointerEvents: open ? 'auto' : 'none', top: 0, bottom: 0, right: 0 }}
            >
                <Flex vertical gap='small' style={blocksFlexStyle}>
                    {NodeButtons.map((nodeButton, index) => (
                        <Button key={index} style={{ pointerEvents: 'auto' }} onClick={() => addNode(nodeButton.type, nodeButton.nodeLabel)}>{nodeButton.buttonText}</Button>
                    ))}
                </Flex>
            </Drawer>
        </div>
    );
};

export default WorkspaceBlocks;