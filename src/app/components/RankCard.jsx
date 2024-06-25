// RankCard.js
import React from "react";
import Image from 'next/image';
import { FaGripfire } from "react-icons/fa";
import { LuBadge } from "react-icons/lu";

const RankCard = ({ name, completionTime, moves, path, inactive, rank }) => {
    // Determine badge color based on rank
    const getBadgeColor = () => {
        if (rank === 1) return "gold";
        else if (rank === 2) return "silver";
        else if (rank === 3) return "bronze";
        else return "white";
    };

    return (
        <div className={`flex-col text-white space-y-5 items-center justify-start mb-10 ${inactive ? 'opacity-50 grayscale' : ''}`}>
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 mt-2 ml-2">
                {rank <= 3 && !inactive ? (
                    <LuBadge size={24} className={`text-${getBadgeColor()}-500`} />
                ) : (
                    <div className="w-6 h-6"></div> // Placeholder for lower ranks and inactive cards
                )}
            </div>

            {/* Player Avatar */}
            <div className="relative">
                <Image
                    src={path || '/default-avatar.png'}
                    alt={`${name || 'Inactive'}`}
                    width={100}
                    height={100}
                    className="rounded-xl w-full"
                />
                {!inactive && (
                    <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full">
                        Time: {completionTime}
                    </div>
                )}
            </div>

            {/* Player Info */}
            <div className="flex-col justify-center space-y-2 items-center">
                <div className="flex space-x-2 items-center">
                    <FaGripfire className="text-md" />
                    <p className="text-md">{name || 'Inactive'}</p>
                </div>
                {!inactive && <p className="text-md p-0 m-0 align-center text-center">{moves} Moves</p>}
            </div>
        </div>
    );
};

export default RankCard;
