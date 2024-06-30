"use client"

import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7 space-y-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-4">How to Play the 8-Puzzle Game</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-2">Objective</h2>
        <p className="mb-4">Arrange the tiles from 1 to 8 in the following order:</p>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <Tile number={1} />
          <Tile number={2} />
          <Tile number={3} />
          <Tile number={4} />
          <Tile number={5} />
          <Tile number={6} />
          <Tile number={7} />
          <Tile number={8} />
          <Tile blank />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Game Setup</h2>
        <p className="mb-4">The puzzle starts in a shuffled state with tiles and a blank space. The blank space allows tiles to move.</p>
        <h3 className="text-xl font-semibold mb-2">Rules of the Game</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Movement: Slide a tile into the blank space if it is adjacent to it. The blank space will then take the place of the moved tile.</li>
          <li>Legal Moves:
            <ul className="list-disc pl-5">
              <li>Four possible moves (up, down, left, right) if the blank space is not on an edge or corner.</li>
              <li>Three possible moves if the blank space is on an edge.</li>
              <li>Two possible moves if the blank space is in a corner.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Steps to Play</h2>
        <ul className="list-decimal pl-5 space-y-2">
          <li>Identify the Blank Space: Locate the blank space on the grid.</li>
          <li>Determine Possible Moves: Check which tiles are adjacent to the blank space.</li>
          <li>Slide a Tile: Choose an adjacent tile and slide it into the blank space.</li>
          <li>Repeat: Continue sliding tiles until the puzzle is solved.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Strategies</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Corners First: Position the corner pieces (1, 3, 7, 9) first.</li>
          <li>Row by Row: Solve the puzzle row by row, starting from the top.</li>
          <li>Column by Column: Solve the puzzle column by column, starting from the left.</li>
          <li>Edge Pieces: Get the edge pieces in place before the center pieces.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Example of Solving</h2>
        <div className="mb-4">
          <p className="mb-2">Initial state:</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <Tile number={2} />
            <Tile number={8} />
            <Tile number={3} />
            <Tile number={1} />
            <Tile blank />
            <Tile number={4} />
            <Tile number={7} />
            <Tile number={6} />
            <Tile number={5} />
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Move 6 down:</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <Tile number={2} />
            <Tile number={8} />
            <Tile number={3} />
            <Tile number={1} />
            <Tile number={6} />
            <Tile blank />
            <Tile number={7} />
            <Tile number={4} />
            <Tile number={5} />
          </div>
        </div>
        <div>
          <p className="mb-2">Move 4 left:</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <Tile number={2} />
            <Tile number={8} />
            <Tile number={3} />
            <Tile number={1} />
            <Tile number={4} />
            <Tile blank />
            <Tile number={7} />
            <Tile number={6} />
            <Tile number={5} />
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-2">Tips</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Focus on solving small sections of the puzzle, such as the first row or column.</li>
          <li>Use the blank space strategically to maneuver tiles into the correct positions.</li>
          <li>Be patient and think ahead about the sequence of moves.</li>
        </ul>
      </section>
    </div>
  );
};

const Tile = ({ number, blank }) => {
  const baseClasses = "flex items-center justify-center h-16 w-16 border border-gray-400 text-2xl";
  const blankClasses = blank ? "bg-gray-200" : "bg-white";
  return (
    <div className={`${baseClasses} ${blankClasses}`}>
      {number}
    </div>
  );
};

export default About;