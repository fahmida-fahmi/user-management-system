import React, { useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { Link, useLoaderData } from 'react-router-dom';
import SingleUser from './SingleUser';
const ShowUsers = () => {
    const usersLoader = useLoaderData()
    const [users, setUsers] = useState(usersLoader)
    return (
        <div className='w-3/4 mx-auto my-5 family'>

            <div className='flex'>
                <Link to='/addUser' className='flex items-center text-violet-600 text-xl border py-2 px-3 no-underline rounded-lg shadow-md'>
                    <p className='mb-0 me-2'>New User</p>
                    <FaUserAlt></FaUserAlt>
                </Link>
            </div>
            <div className='grid grid-cols-6 w-full bg-black mt-5 text-white  py-2 text-xl text-center'>
                <p className='w-1/2'>ID</p>
                <p className=''>Name</p>
                <p className=''>@Email</p>
                <p>Gender</p>
                <p>Status</p>
                <p>Action</p>
                
            </div>
            {
                users.map(user => <SingleUser
                    key={user._id}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                ></SingleUser>)
            }
        </div >
    );
};

export default ShowUsers;