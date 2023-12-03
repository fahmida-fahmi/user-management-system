import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const SingleUser = ({ setUsers, users, user }) => {
    const { _id, name, email, gender, status } = user
    const handleDelete = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:2000/users/${id}`,{
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {

                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    const remaining = users.filter(user => user._id !== id)
                    setUsers(remaining)
                })
            }
          })
    }
    return (
        <div className='grid grid-cols-6 w-full items-center text-center family border-b border-gray-400 py-2'>
            <p className='w-1/2'>{users.indexOf(user) + 1}.</p>
            <p className='w-full'>{name}</p>
            <p>{email}</p>
            <p>{gender}</p>
            <p>{status}</p>
            <div className='flex justify-center text-violet-500'>
                <Link to={`updateUser/${_id}`} className='p-3 text-violet-500 shadow-md me-3'>
                    <FaPencilAlt className=''></FaPencilAlt>
                </Link>
                <div className='p-3 shadow-lg cursor-pointer' onClick={()=>handleDelete(_id)}>
                    <RxCross1></RxCross1>
                </div>

            </div>
        </div>
    );
};

export default SingleUser;