
import React from "react";

const Window = ({ children, style = {flex: 1} }) => {
    return (
        <div className="absolute cursor-default"  style={style}>
                    <div className="p-4">{children}</div>
        </div>
    );
};

export default Window;