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
    const initialNodes : Node[] = [
        {
            id : '1',
            position: {x: 200, y: 200},
            data: { label: 'Node 1' },
            type: 'inputNode'
        },
        {
            id : '2',
            position: {x: 550, y: 200},
            data: { label: 'Node 2' },
            type: 'processNode'
        },
        {
            id : '3',
            position: {x: 800, y: 200},
            data: { label: 'Node 3' },
            type: 'outputNode'
        },
    ]

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNodes, setSelectedNodes] = useState<string[] | null>(null)
    const [_, setSelectedEdges] = useState<string[] | null>(null)

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
                    fitView
                >
                    <Controls />
                    <Background />
                    <WorkspaceBlocks addNode={addNode} />
                </ReactFlow>
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