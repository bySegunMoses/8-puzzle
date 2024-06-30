"use client"

import React from 'react';
import Link from "next/link";
import {Button} from 'react-aria-components';
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import dice from '../../assets/images/dice.png';
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const navigate = useRouter();

    const handleNavigate = (url) => {
        navigate.push(url)
    }

    const buttonStyle = "hover:bg-[#111E30] text-white px-6 py-4 justify-center space-x-4 items-center rounded-xl";

    return (
        <section className='relative flex flex-col lg:flex-row justify-center items-center mt-35 pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7'>
            <div className='w-full lg:w-1/2'>
                <Image 
                    priority
                    src={dice}
                    alt="Game Zone"
                    className="w-full h-auto"
                />
            </div>
            <div className='space-y-20 w-full lg:w-1/2 mt-10 lg:mt-0'>
                <div className='space-y-4'>
                    <p className='text-brandColor'>Follow us, sign up, top the leaderboard, win prize.</p>
                    <h1 className='text-6xl text-white font-bold'>Puzzle Your Way to N5,000!</h1>
                </div>
                <Link href={"/dashboard"} className={`inline-flex text-lg ${buttonStyle} bg-blue-700 font-medium`}>
                    <p>Claim Your Spot</p>
                    <FaArrowRight className='text-sm text-white bg-none' />
                </Link>
            </div>
        </section>
    );
}

export default HeroSection;