// import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2'

const UpdateUser = () => {
    const userLoader = useLoaderData()

    const handleForm = event => {
        event.preventDefault()

        const form = event.target 

        const name = form.name.value 
        const email = form.email.value 
        const gender = form.gender.value 
        const status = form.status.value 
        const newUser = {name,email,gender,status}
        console.log(newUser);
        
        fetch(`http://localhost:2000/users/${userLoader._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            // if(data.modifiedId> 0){

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The  user has been Updated successfully!',
                    showConfirmButton: true,
                  })
            form.reset()
            // }
        })

    }
    return (
        <div className='w-3/4 mx-auto my-5 text-gray-400 family'>
        <div>
            <Link to='/' className='text-xl flex items-center no-underline'>
                <MdOutlineKeyboardDoubleArrowLeft />
                <p className='ms-2 mb-0 '>All Users</p>
            </Link>
        </div>
        <div className='text-center'>
            <h1 className='text-black'>Update User</h1>
            <p>Use the below form to update this user account</p>
        </div>
        <Form onSubmit={handleForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className=''>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name ( only 2 words)" name='name' defaultValue={userLoader?.name} required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={userLoader?.email} placeholder="Enter Your Email" name='email' required/>
            </Form.Group>
            <Form.Group className="mb-3 flex justify-between w-1/4" controlId="formBasicCheckbox">
                <Form.Label className=''>Gender</Form.Label>
                <Form.Check type="radio" label="Male" className='mx-5' name='gender' value='Male'  required/>
                <Form.Check type="radio" label="Female"  name='gender' value='Female' required />

            </Form.Group>
            <Form.Group className="mb-3 flex justify-between w-1/4" controlId="formBasicCheckbox">
                <Form.Label  className='me-2'>Status</Form.Label>
                <Form.Check type="radio" label="Active" className='mx-5' name='status' value='Active' required />
                <Form.Check type="radio" label="Inactive" name='status' value='Inactive' required/>
            </Form.Group>
            <input type="submit" value='Submit' className='w-full bg-[#06D6A0] p-2 text-center text-white text-xl rounded-md'/>
                
            
        </Form>
    </div>
    );
};

export default UpdateUser;