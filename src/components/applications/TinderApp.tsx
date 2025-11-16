"use client"

import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";

const data = [
{
    skillImage:'https://blog.alexdevero.com/wp-content/uploads/2015/03/sass-logo.jpg',
        skillName: 'SASS',
},
{
    skillImage: 'https://res.cloudinary.com/practicaldev/image/fetch/s--6hVkd4-H--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/kaevhj4qy0tn4pbprmh5.png',
        skillName: 'Git',
},
{
    skillImage: 'https://cdn-media-1.freecodecamp.org/images/1*FDNeKIUeUnf0XdqHmi7nsw.png',
        skillName: 'Material-UI',
},
{
    skillImage: 'https://avatars.githubusercontent.com/u/54212428?s=280&v=4',
        skillName: 'Chakra-UI',
},
{
    skillImage: 'https://codersera.com/blog/wp-content/uploads/2019/02/react-native.png',
        skillName: 'React Native',
},
{
    skillImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
        skillName: 'Javascript',
},
{
    skillImage: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
        skillName: 'React JS',
},
    ]

const TinderApp = ({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) => {

    return (

            <div
                className={`
         ${maximized ? `fixed top-0 left-0 w-screen h-[calc(100vh-50px)] overflow-hidden rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
               ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all'}
         rounded-[10px] backdrop-blur-md text-white border border-gray-600`}>

                <div
                    className={`titleBar h-[40px] flex justify-between items-center 
                bg-black/40 backdrop-blur-md text-white 
                rounded-t-[11px] overflow-hidden`}>
                    <span className="pl-3">{title}</span>
                    <div className="h-full">
                        <button onClick={onMinimize} className="w-[50px] h-full text-white hover:bg-gray-600">➖</button>
                        {maximized ? (
                            <button onClick={onRestoreMaximized} className="w-[50px] h-full hover:bg-gray-600 px-2">🗗</button>
                        ): (
                            <button onClick={onMaximize} className="w-[50px] h-full hover:bg-gray-600 px-2">🗖</button>
                        )}
                        <button onClick={onClose} className="w-[50px] h-full text-white hover:bg-red-600">✕</button>
                    </div>
                </div>

                <div
                    className="grid h-full w-full place-items-center bg-neutral-100 overflow-hidden"

                >
                    {data.map((card, index) => {
                        return (
                            <TinderCard
                                className="absolute"
                                key={index}
                                preventSwipe={["up", "down"]}
                                onCardLeftScreen={() => console.log(card.skillName + " left")}
                            >
                                <div className="w-[300px] h-[420px] rounded-xl overflow-hidden bg-white">
                                    <Image
                                        src={card.skillImage}
                                        alt={card.skillName}
                                        width={300}
                                        height={420}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </TinderCard>


                        );
                    })}
                </div>
            </div>
    );
};
export default TinderApp