"use client";

import React, { useMemo, useState } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import Draggable from "../utils/draggable"; 
import data from "../utils/skillsData"

const TinderApp = ({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) => {

    const cardRefs = useMemo(
        () => Array(data.length).fill(0).map(() => React.createRef()),
        []
    );

    const [currentIndex, setCurrentIndex] = useState(data.length - 1);

    const swipe = (dir) => {
        if (currentIndex < 0) return;
        cardRefs[currentIndex].current.swipe(dir);
        setCurrentIndex((prev) => prev - 1);
    };

    return (
        <Draggable handle=".titleBar">
            <div
                className={`
                ${maximized ? `fixed top-0 left-0 w-screen h-[calc(100vh-50px)] overflow-hidden rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
                ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all'}
                rounded-[10px] backdrop-blur-md text-white border border-gray-600`}
            >

                <div
                    className={`titleBar h-[40px] flex justify-between items-center 
                    bg-black/40 backdrop-blur-md text-white 
                    rounded-t-[11px] overflow-hidden`}
                >
                    <span className="pl-3">{title}</span>
                    <div className="h-full">
                        <button onClick={onMinimize} className="w-[50px] h-full text-white hover:bg-gray-600">➖</button>
                        {maximized ? (
                            <button onClick={onRestoreMaximized} className="w-[50px] h-full hover:bg-gray-600 px-2">🗗</button>
                        ) : (
                            <button onClick={onMaximize} className="w-[50px] h-full hover:bg-gray-600 px-2">🗖</button>
                        )}
                        <button onClick={onClose} className="w-[50px] h-full text-white hover:bg-red-600">✕</button>
                    </div>
                </div>

                <div className="grid h-full w-full place-items-center bg-neutral-100 overflow-hidden relative">

                    {data.map((card, index) => (
                        <TinderCard
                            ref={cardRefs[index]}
                            className="absolute w-300 h-380"
                            key={index}
                            preventSwipe={["up", "down"]}
                            onCardLeftScreen={() => console.log(card.skillName + " left")}
                        >
                            <div className="w-[300px] h-[380px] rounded-xl flex items-center justify-center overflow-hidden bg-white">
                                <Image
                                    src={card.skillImage}
                                    alt={card.skillName}
                                    width={270}
                                    height={340}
                                    className=""
                                />
                            </div>
                        </TinderCard>
                    ))}

                    {/* Swipe Buttons */}
                    <div className="absolute bottom-20 flex gap-6">
                        <button
                            onClick={() => swipe("left")}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-xl"
                        >
                            ❌
                        </button>

                        <button
                            onClick={() => swipe("right")}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-xl"
                        >
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default TinderApp;
