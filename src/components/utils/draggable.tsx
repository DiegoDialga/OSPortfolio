import React, { useState, useRef, useEffect } from "react";

interface DraggableProps {
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    handle?: string; // CSS selector
}

const Draggable: React.FC<DraggableProps> = ({ children, defaultPosition = { x: 0, y: 0 }, handle }) => {
    const [position, setPosition] = useState(defaultPosition);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node || !handle) return;

        const handleElement = node.querySelector(handle) as HTMLElement;
        if (!handleElement) return;

        handleElement.style.cursor = "grab";

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            setDragging(true);
            setOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        };

        handleElement.addEventListener("mousedown", onMouseDown);

        return () => {
            handleElement.removeEventListener("mousedown", onMouseDown);
        };
    }, [handle, position]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const stopDrag = () => setDragging(false);

    return (
        <div
            ref={nodeRef}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                userSelect: dragging ? "none" : "auto",
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
