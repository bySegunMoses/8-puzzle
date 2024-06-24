"use client"

import React from 'react';
import {Button} from 'react-aria-components';
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import dice from '../../assets/images/dice.png'

const HeroSection = () => {
    const buttonStyle = "hover:bg-[#111E30] text-white px-6 py-4 justify-center space-x-4 items-center rounded-xl"
    return (
        <section className='relative flex justify-center items-center mt-35 pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7'>
            <div className='space-y-20 w-[50%]'>
                <div className='space-y-4'>
                    <p className='text-brandColor'>Discover Games That You Will Love</p>
                    <h1 className='text-6xl text-white font-bold'>Read About Games That You Enjoy</h1>
                </div>
                <div className={`inline-flex text-lg ${buttonStyle} bg-blue-700 font-medium`}>
                    <Button>Start Exploring</Button>
                    <FaArrowRight className='text-sm text-white bg-none' />
                </div>
            </div>
            <div className='w-[50%]'>
                <Image 
                    priority
                    src={dice}
                    alt="Game Zone"
                />
            </div>
        </section>
    )
}

export default HeroSection;