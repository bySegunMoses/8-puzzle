"use client"

import React from "react";
import Image from 'next/image';
import { FaGripfire } from "react-icons/fa6";


const RankCard = ({name, followers, path}) => {
    return (
        <div className="flex-col text-white space-y-5 items-center justify-start mb-10">
            <Image
                src={path}
                alt={`${name}'s Avatar`}
                width={100}
                height={100}
                className="rounded-xl w-full"
            />
            <div className="flex justify-between space-x-2 px-4 items-center">
                <FaGripfire className="text-md" />
                <p className="text-md">{followers} Followers</p>
            </div>
        </div>
    )
}

export default RankCard;