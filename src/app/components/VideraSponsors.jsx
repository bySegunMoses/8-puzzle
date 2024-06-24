"use client"

import React from 'react';
import Image from 'next/image';
import { FaCode } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import videraLogo from '../../assets/images/videra-logo.png'

const VideraSponsors = () => {

    return (
        <section className='flex gap-5'>
            <div className='w-[500px] h-[250px] relative'>
                <Image
                    className='rounded-xl object-cover'
                    alt="Sponsor Name"
                    src={videraLogo}
                    layout="fill"
                />
            </div>
            <div className='space-y-5 text-[#b4bac3]'>
                <div className='flex py-2 px-3 bg-[#374151] items-center space-x-2 justify-center w-[20%] text-[#ADB9D9] rounded-lg font-medium'>
                    <FaCode className='text-2xl' style={{ strokeWidth: 4 }}/>
                    <p className='text-sm'>TECH</p>
                </div>

                <div className='w-[90%] flex-col'>
                    <p className='text-lg font-bold text-white'>Two Destiny 2 Exotics Disabled Due To Exploits -- Again</p>
                    <p className='text-sm font-light'>If you've been enjoying the increased melee damage associated with certain Exotic gauntiets in Destiny 2, we have some..</p>
                </div>

                <div className='flex space-x-2 items-center justify-start'>
                    <span className='p-2 bg-[#8111B3] text-xl text-white rounded-full'><FaCodeBranch style={{ strokeWidth: 2 }} /></span>
                    <span className='flex-col text-sm'>
                        <p className='font-extrabold'>REPO</p>
                        <p className='font-light'>1 HOUR AGO</p>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default VideraSponsors;