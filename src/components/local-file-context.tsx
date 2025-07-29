import React, { createContext, useContext, useState } from "react";

interface LocalFileContextType {
    filename: string;
    data: any;
    setFile: (filename: string, data: any) => void;
    clearFile: () => void;
}

const LocalFileContext = createContext<LocalFileContextType | undefined>(undefined);

export function LocalFileProvider({ children }: { children: React.ReactNode }) {
    const [filename, setFilename] = useState("");
    const [data, setData] = useState<any>(null);

    const setFile = (fname: string, fileData: any) => {
        setFilename(fname);
        setData(fileData);
    };

    const clearFile = () => {
        setFilename("");
        setData(null);
    };

    return (
        <LocalFileContext.Provider value={{ filename, data, setFile, clearFile }}>
            {children}
        </LocalFileContext.Provider>
    );
}

export function useLocalFile() {
    const ctx = useContext(LocalFileContext);
    if (!ctx) throw new Error("useLocalFile must be used within LocalFileProvider");
    return ctx;
}
