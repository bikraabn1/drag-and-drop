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

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 100 },
    },
    {
        id: '2',
        type: 'default',
        data: { label: 'default node' },
        position: { x: 250, y: 0 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'output node' },
        position: { x: 250, y: 200 },
    },
];

const DragAndDropFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { screenToFlowPosition } = useReactFlow();
    const [ type, setType ] = useDnD();

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

    return (
        <div className='dndflow' style={{ width: '100%', height: '100%', }}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%', }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls />
                    <Background />
                    <Sidebar />
                </ReactFlow>
            </div>
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