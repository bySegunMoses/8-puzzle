import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {navConfig} from './config';

export const NavLinks = () => {
  const navigate = useRouter();
  const currentRoute = navigate.pathname;
  const {about, playGame, news, contact, signIn, account} = navConfig.links;

  const handleNavigate = (url) => {
    navigate.push(url)
  }

  return (
    <div className="hidden font-swissCondensed font-black text-sm md:text-md whitespace-nowrap md:flex h-10 items-center justify-between flex-row md:flex hidden">
      <button onClick={() => {handleNavigate(about.route)}} className="text-md h-9 items-center justify-center mx-5 ">
        <p className="text-white">{about.title}</p>
      </button>

      <button onClick={() => {handleNavigate(playGame.route)}} className="text-md h-9 items-center justify-center mx-5 ">
        <p className="text-white">{playGame.title}</p>
      </button>

      <button onClick={() => {handleNavigate(news.route)}} className="text-md h-9 items-center justify-center mx-5 ">
        <p className="text-white">{news.title}</p>
      </button>
    </div>
  );
};
