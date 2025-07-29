import React, { useRef, useState } from "react";

interface DragAndDropFileProps {
    onFiles: (files: FileList) => void;
    accept?: string;
    multiple?: boolean;
    className?: string;
}

export function DragAndDropFile({ onFiles, accept, multiple = false, className = "" }: DragAndDropFileProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFiles(e.target.files);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"} ${className}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            tabIndex={0}
            role="button"
            aria-label="Drop files here or click to select"
        >
            <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-medium text-gray-700">Drag & drop files here</span>
                <span className="text-xs text-gray-500 mt-2">or click to select files</span>
            </div>
        </div>
    );
}
