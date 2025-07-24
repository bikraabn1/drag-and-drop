'use client'
import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
    type Node,
    type Edge,
    Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import Sidebar from '../components/Sidebar';
import { DnDProvider, useDnD } from '../../context/DnDContext';
import { useCallback, useRef } from 'react';
import WorkspaceBlocks from '../components/WorkspaceBlocks';
import { NodeTypes } from '../components/nodes/node-types';

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNode : Node[] = [
    {
        id: getId(),
        type: 'customNode',
        data: { label: 'Node 1' },
        position: {x: 100, y: 200},
    }
]

const DragAndDropFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type, setType] = useDnD();

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: getId(),
                type: type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
            setType(null);
        },
        [screenToFlowPosition, type, setNodes, setType],
    );

    const addNode = (nodeType: string, label: string) => {
        const newNode = {
            id: getId(),
            type: nodeType,
            position: { x: 100 + nodes.length * 5, y: 100 + nodes.length * 5 },
            data: { label },
        }
        setNodes((nodes) => nodes.concat(newNode))        
    }

    return (
        <div className='dndflow' style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%', }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    nodeTypes={NodeTypes}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls />
                    <Background />
                    <WorkspaceBlocks addNode={addNode}/>
                </ReactFlow>
            </div>
            {/* <Sidebar /> */}
        </div>
    );
};

const WorkspaceLayout = () => {
    return (
        <DnDProvider>
            <DragAndDropFlow />
        </DnDProvider>
    );
};

export default WorkspaceLayout;