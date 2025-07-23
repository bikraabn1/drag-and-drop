'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface DndProviderProps {
    children: React.ReactNode
}

interface DndContextType {
    type : string | null,
    setType : Dispatch<SetStateAction<string | null>>
}

const DnDContext = createContext<any>(undefined);

export const DnDProvider = ({ children }: DndProviderProps) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
}

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
}