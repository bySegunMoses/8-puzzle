// RankCard.js
import React from "react";
import Image from 'next/image';
import { FaGripfire } from "react-icons/fa";
import { LuBadge } from "react-icons/lu";

const RankCard = ({ name, completionTime, moves, path, inactive, rank }) => {
    // Determine badge color based on rank
    const getBadgeColor = () => {
        if (rank === 1) return "#E4C41B";
        else if (rank === 2) return "silver";
        else if (rank === 3) return "bronze";
        //else return "white";
    };

    return (
        <div className={`relative flex flex-col text-white space-y-5 items-center justify-start mb-10 w-44 h-64 ${inactive ? 'opacity-50 grayscale' : ''}`}>
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 mt-2 ml-2 flex items-center justify-center w-8 h-8">
                <div className={`relative flex items-center z-10 justify-center w-full h-full text-xs font-bold rounded-full`}>
                    <LuBadge size={24} className={`absolute text-[${getBadgeColor()}]`} />
                    <p className={`absolute text-[${getBadgeColor()}]`}>{rank}</p>
                </div>
            </div>

            {/* Player Avatar */}
            <div className="relative w-35 h-60">
                <Image
                    src={path || '/default-avatar.png'}
                    alt={`${name || 'Inactive'}`}
                    width={100}
                    height={100}
                    className="rounded-xl w-full h-full object-cover"
                />
                {!inactive && (
                    <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full text-xs">
                        Time: {completionTime}
                    </div>
                )}
            </div>

            {/* Player Info */}
            <div className="flex-col justify-center space-y-2 items-center text-center">
                <div className="flex space-x-2 items-center">
                    <FaGripfire className="text-md" />
                    <p className="text-sm truncate w-full">{name || 'Inactive'}</p>
                </div>
                {!inactive && <p className="text-xs p-0 m-0">{moves} Moves</p>}
            </div>
        </div>
    );
};

export default RankCard;