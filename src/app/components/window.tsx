import React from "react";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';


const Window = ({ children, onClick, style }) => {
    return (
        <div className="absolute" onDrag={onClick} onClick={onClick} style={style}>
            <Draggable disabled={true} >

                <ResizableBox>
                    <div className="p-4">{children}</div>
                </ResizableBox>

            </Draggable>
        </div>
    );
};

export default Window;