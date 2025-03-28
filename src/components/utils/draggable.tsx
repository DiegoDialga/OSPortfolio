import React, { useState } from "react";

interface DraggableProps {
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
}

const Draggable: React.FC<DraggableProps> = ({ children, defaultPosition = { x: 0, y: 0 } }) => {
    const [position, setPosition] = useState(defaultPosition);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevents text selection issues
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => setDragging(false);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stops dragging if mouse leaves window
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: "grab",
                userSelect: "none",
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
