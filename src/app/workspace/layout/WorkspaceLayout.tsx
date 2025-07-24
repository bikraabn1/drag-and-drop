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
    useOnSelectionChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from '../../context/DnDContext';
import { useCallback, useRef, useState } from 'react';
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
    const [selectedNodes, setSelectedNodes] = useState<string[] | null>(null)
    const [selectedEdges, setSelectedEdges] = useState<string[] | null>(null)
    const { screenToFlowPosition } = useReactFlow();
    const [type, setType] = useDnD();

    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    interface onChangeCallback { 
        nodes : Node[], 
        edges : Edge[]
    }

    useOnSelectionChange({
        onChange : ({ nodes, edges  } : onChangeCallback) => {
            setSelectedNodes(nodes.map((node : Node) => node.id))
            setSelectedEdges(edges.map((edge : Edge) => edge.id))
        }
    })

    console.log(selectedNodes?.join(', '))

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

    const nodeWithProps = nodes.map(node => ({
        ...node,
        data : {
            ...node.data,
            isSelected: selectedNodes?.includes(node.id)
        }
    }))
    
    return (
        <div className='dndflow' style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%', }}>
                <ReactFlow
                    nodes={nodeWithProps}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    nodeTypes={NodeTypes}
                    onDragOver={onDragOver}
                >
                    <Controls />
                    <Background />
                    <WorkspaceBlocks addNode={addNode}/>
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