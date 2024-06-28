"use client"

import React from 'react';
import Image from 'next/image';
import { FaCode } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import videraLogo from '../../assets/images/videra-logo.png';

const VideraSponsors = () => {
    return (
        <section className='flex flex-col md:flex-row gap-5 items-center'>
            <div className='relative w-full md:w-[250px] h-[250px]'>
                <Image
                    className='rounded-xl object-cover'
                    alt="Sponsor Name"
                    src={videraLogo}
                    layout="fill"
                />
            </div>
            <div className='space-y-5 text-[#b4bac3] w-full md:w-[70%]'>
                <div className='flex py-2 px-3 bg-[#374151] items-center space-x-2 justify-center md:w-[20%] w-[40%] text-[#ADB9D9] rounded-lg font-medium'>
                    <FaCode className='text-xl md:text-2xl' style={{ strokeWidth: 4 }} />
                    <p className='text-xs md:text-sm'>TECH</p>
                </div>

                <div className='flex flex-col space-y-2'>
                    <p className='text-base md:text-lg font-bold text-white line-clamp-2'>
                        Videra Tech builds modern SaaS and IaaS plaforms
                    </p>
                    <p className='text-xs md:text-sm font-light leading-relaxed'>
                        We’re an informative brand that gives insights on how newbies in tech can progress whilst adopting cloud solutions and other technological trends. We offer swift software development services and have tailor made softwares ready to onboard potential investors.
                    </p>
                </div>

                <div className='flex space-x-2 items-center justify-start'>
                    <a href="https://www.instagram.com/videra_tech/" target="_blank" rel="noopener noreferrer" className='p-2 bg-[#8111B3] text-base md:text-xl text-white rounded-full'>
                        <FaCodeBranch style={{ strokeWidth: 2 }} />
                    </a>
                    <a href="https://www.instagram.com/videra_tech/" target="_blank" rel="noopener noreferrer" className='flex flex-col text-xs md:text-sm'>
                        <p className='font-extrabold'>FOLLOW US</p>
                        <p className='font-light'>@videra_tech</p>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default VideraSponsors;
