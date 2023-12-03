import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Common = () => {
    return (
        <div className='border-4 border-[#06d6a0] w-4/5 mx-auto my-10'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Common;