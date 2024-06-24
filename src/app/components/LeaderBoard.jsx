"use client"

import React, {useState} from 'react';
import {Button} from 'react-aria-components';
import { mockPlayers } from '../../data/boardData';
import RankCard from './RankCard';

const LeaderBoard = () => {
    const [players, setPlayers] = useState(mockPlayers);

    const buttonStyle = "hover:bg-primary text-white py-2 px-4 justify-center space-x-4 items-center rounded-xl";
    
    return (
        <section className='flex flex-col text-white justify-between items-center mt-35 pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7'>
            <div className='flex w-full justify-between items-center mb-10'>
                <h1 className='text-4xl font-bold'>Current LeaderBoard</h1>
                <Button className={`${buttonStyle} bg-gray-700`}>
                    See All
                </Button>
            </div>

            <div className="flex flex-wrap w-full justify-between items-center gap-2">
                {mockPlayers.map((player) => (
                        <RankCard
                            key={player.id}
                            name={player.name}
                            followers={player.followers}
                            path={player.image}
                        />
                    ))}
            </div>
        </section>
    )
}

export default LeaderBoard;