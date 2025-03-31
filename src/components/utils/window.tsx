
import React from "react";

const Window = ({ children, onClick, style }) => {
    return (
        <div className="absolute" onDrag={onClick} onClick={onClick} style={style}>


                    <div className="p-4">{children}</div>

        </div>
    );
};

export default Window;