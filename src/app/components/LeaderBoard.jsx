// LeaderBoard.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import RankCard from './RankCard';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock data with images for demonstration
export const mockPlayers = [
    { id: 1, image: "https://i.pinimg.com/564x/56/74/f4/5674f4b6491cea7cc3c5d34e84bf1a71.jpg" },
    { id: 2, image: "https://i.pinimg.com/564x/18/42/05/184205f42f11adfb52884ccb6878a339.jpg" },
    { id: 3, image: "https://i.pinimg.com/736x/f5/9f/8c/f59f8c5ca68ec3e3e3faa337736ae67a.jpg" },
    { id: 4, image: "https://i.pinimg.com/564x/df/60/4e/df604e5126637539fa043c3e6960085a.jpg" },
    { id: 5, image: "https://i.pinimg.com/564x/5a/f4/43/5af443207f83588e27489d2e44d03fba.jpg" },
    { id: 6, image: "https://i.pinimg.com/564x/cd/19/b2/cd19b248d4cbd3ad7a0c1080cf524ab1.jpg" },
];

const LeaderBoard = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'LeaderBoard'));
                const leaderboardData = [];

                querySnapshot.forEach((doc) => {
                    leaderboardData.push({ id: doc.id, ...doc.data() });
                });

                const sortedPlayers = leaderboardData.sort((a, b) => {
                    const timeA = a.totalCompletionTime.minutes * 60 + a.totalCompletionTime.seconds;
                    const timeB = b.totalCompletionTime.minutes * 60 + b.totalCompletionTime.seconds;

                    if (timeA === timeB) {
                        return a.totalMoves - b.totalMoves;
                    }
                    return timeA - timeB;
                }).slice(0, 6); // Take the top 6 players

                setPlayers(sortedPlayers);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <section className='flex flex-col text-white justify-between items-center mt-35 pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7'>
            <div className='flex w-full justify-between items-center mb-10'>
                <h1 className='text-4xl font-bold'>Current LeaderBoard</h1>
                <Button className="hover:bg-primary text-white py-2 px-4 justify-center space-x-4 items-center rounded-xl bg-gray-700">
                    See All
                </Button>
            </div>

            <div className="flex flex-wrap w-full justify-between items-center gap-2">
                {players.length === 0 ? (
                    Array(6).fill(0).map((_, index) => (
                        <RankCard key={index} inactive={true} />
                    ))
                ) : (
                    players.map((player, index) => (
                        <RankCard
                            key={player.id}
                            name={player.username} // Assuming username is fetched from Firebase data
                            completionTime={`${player.totalCompletionTime.minutes}m ${player.totalCompletionTime.seconds}s`}
                            moves={player.totalMoves}
                            path={mockPlayers[index].image} // Assigning image based on sorted rank
                            inactive={false}
                            rank={index + 1}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default LeaderBoard;
