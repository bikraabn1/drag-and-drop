'use client'
import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    type Node,
    type Edge,
    Connection,
    useOnSelectionChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useState } from 'react';
import WorkspaceBlocks from '../components/WorkspaceBlocks';
import { NodeTypes } from '../components/nodes/node-types';

let id = 0;
const getId = () => `dndnode_${id++}`;

const DragAndDropFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNodes, setSelectedNodes] = useState<string[] | null>(null)
    const [nodeData, setNodeData] = useState<Record<string, any>>({})
    const [_, setSelectedEdges] = useState<string[] | null>(null)

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const updateNodeData = (nodeId: string, newData: {}) => {
        setNodeData(prev => ({ ...prev, [nodeId]: newData }))
    }

    interface onChangeCallback {
        nodes: Node[],
        edges: Edge[]
    }

    const addNode = (nodeType: string, label: string) => {
        const newNode = {
            id: getId(),
            type: nodeType,
            position: { x: 100 + nodes.length * 5, y: 100 + nodes.length * 5 },
            data: { label },
        }
        setNodes((nodes) => nodes.concat(newNode))
    }

    const nodeWithProps = nodes.map(node => {
        const baseData = {
            ...node.data,
            isSelected: selectedNodes?.includes(node.id),
            onDataChange: updateNodeData,
            nodeData: nodeData[node.id] || {}
        };

        if (node.type === 'inputNode') {
            return {
                ...node,
                data: baseData
            }
        } 
        
        return node
        
    })
    
    useOnSelectionChange({
        onChange: ({ nodes, edges }: onChangeCallback) => {
            setSelectedNodes(nodes.map((node: Node) => node.id))
            setSelectedEdges(edges.map((edge: Edge) => edge.id))
        }
    })

    return (
        <div className='dndflow' style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%', }}>
                <ReactFlow
                    nodes={nodeWithProps}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={NodeTypes}
                >
                    <Controls />
                    <Background />
                    <WorkspaceBlocks addNode={addNode} />
                </ReactFlow>
            </div>
            <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(255,255,255,0.9)',
                padding: 10,
                borderRadius: 5,
                maxWidth: 300,
                fontSize: '12px',
                maxHeight: 200,
                overflow: 'auto'
            }}>
                <strong>Debug - Node Data:</strong>
                <pre>{JSON.stringify(nodeData, null, 2)}</pre>
            </div>
        </div>
    );
};

const WorkspaceLayout = () => {
    return (
        <DragAndDropFlow />
    );
};

export default WorkspaceLayout;