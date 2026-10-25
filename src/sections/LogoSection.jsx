import React from 'react'
import {logoIconsList} from "../constants/index.js";

const LogoIcon = ({icon}) => {
    return (
        <div className="flex-none flex-center flex-col gap-3 marquee-item md:px-6 px-3">
            <img src={icon.imgPath} alt={icon.name} className="md:size-16 size-12"/>
            <p className="text-white-50 text-sm">{icon.name}</p>
        </div>
    )
}

const LogoSection = () => {
    return (
        <div className="md:my-20 my-10 relative">
            <div className="gradient-edge"/>
            <div className="gradient-edge"/>

            <div className="marquee h-52">
                <div className="marquee-box">
                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon}/>
                    ))}

                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LogoSection
