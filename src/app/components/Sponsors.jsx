"use client"

import React from 'react';
import { Button } from 'react-aria-components';
import Newsletter from './Newsletter';
import VideraSponsors from './VideraSponsors';

const Sponsors = () => {

    const buttonStyle = "hover:bg-primary text-white py-2 px-4 justify-center space-x-4 items-center rounded-xl";

    return (
        <section className='flex flex-col text-white justify-between items-center mt-35 pt-20 pb-20 py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7'>
            <div className='flex w-full justify-between items-center mb-10'>
                <h1 className='text-4xl font-bold'>Sponsors</h1>
                <Button className={`${buttonStyle} bg-gray-700`}>Explore</Button>
            </div>

            <div className='flex flex-col lg:flex-row w-full gap-10'>
                <div className='w-full lg:w-2/3'>
                    <VideraSponsors />
                </div>
                <div className='w-full lg:w-1/3'>
                    <Newsletter />
                </div>
            </div>
        </section>
    );
}

export default Sponsors;
