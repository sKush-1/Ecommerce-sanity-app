import { userData } from '@/components/Navbar';
import { createOrGetUser } from '@/lib/utils';
import user from '@/sanity_ecommerce/schemaTypes/user';
import { React, useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { client } from '@/lib/client';
import styled from "styled-components";


const UserProfile = () => {

  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const { register } = useForm();
  const [isEditing, setIsEditing] = useState(true);
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('user');
      
      setUserData(JSON.parse(storedData))
      
    }
  }, []);


  const fetchExistingFormData = async (formDataId) => {
    try {

        const result = await client.fetch(`*[_id == "${formDataId}"][0]`); // Fetch document by ID
        // console.log('Fetched form data:', result);

        setFormData({
          name: result?.name,
          email: result?.email,
          phone: result?.phone,
          address: result?.address,
        });

       
        return result;

    }

     catch (error) {
      console.error('Error checking or fetching form data:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchExistingFormData(userData?.jti); // Assuming formDataId is defined elsewhere
  }, [userData?.jti]);

  console.log(formData)

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      _id: userData?.jti,
      _type: 'formData',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      user: { _type: 'reference', _ref: userData?.sub }, // Reference to the user
    };

    client.createOrReplace(doc).then(() => {
      // window.location.href = '/UserProfile'
    });

  };









  return (
    <div id='form'>
      <form>
        <label>Name</label>

        <input
          name="name"
          {...register('name', { required: true })}
          disabled={isEditing}
          onChange={handleChange}
          value={formData?.name}

        />

        <label>Phone</label>
        <input
          name="phone"
          type='tell'
          {...register('phone', { required: true })}
          disabled={isEditing}
          onChange={handleChange}
          value={formData?.phone}
        />

        <label>Address</label>
        <input
          name="address"
          {...register('address', { required: true })}
          disabled={isEditing}
          onChange={handleChange}
          value={formData?.address}
        />

        <label>Alternate Email</label>
        <input
          name="email" {...register('email', { required: true })}
          disabled={isEditing}
          onChange={handleChange}
          value={formData?.email }
        />

        <button type='button' className='submitButton' onClick={handleSubmit} >Submit</button>
        <button type="button" className='submitButton' onClick={handleEdit}>Edit</button>
      </form>

    </div>
  )
}

export default UserProfile
