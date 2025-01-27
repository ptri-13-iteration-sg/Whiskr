// Modules
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccountCat = () => {
  const navigate = useNavigate();

  // State
  const emailRef = useRef();
  const catNameRef = useRef();
  const catBreedRef = useRef();
  const catAgeRef = useRef();
  const aboutMeRef = useRef();
  const profilePicRef = useRef();

  // Function to handle login submit button
  const handleSubmit = async e => {
    e.preventDefault();

    const newCat = {
      email: emailRef.current.value,
      name: catNameRef.current.value,
      breed: catBreedRef.current.value,
      age: catAgeRef.current.value,
      aboutMe: aboutMeRef.current.value,
      imageUrl: 'https://i.imgur.com/7F5mhPp.gif',
    };

    try {
      const catResponse = await axios.post('/api/login/createCatProfile', newCat);

      if (catResponse) {
        console.log('* New cat profile created, _id: ', catResponse.data);
        navigate('/CardsPage');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Return component
  return (
    <form className='create-profile-page' onSubmit={handleSubmit}>
      <h3>Create a profile for your cat!</h3>
      <label>Email:</label>
      <input type='email' placeholder='Email' ref={emailRef} />
      <label>Name:</label>
      <input type='name' placeholder='Kitty name' ref={catNameRef} />
      <label>Type of cat:</label>
      <select name='age' id='age' ref={catBreedRef}>
        <option value='Calico'>Calico</option>
        <option value='Tabby'>Tabby</option>
        <option value='Siamese'>Siamese</option>
        <option value='Shorthair'>Shorthair</option>
        <option value='Persian'>Persian</option>
        <option value='Burmese'>Burmese</option>
      </select>
      <label>Age of cat:</label>
      <select name='age' id='age' ref={catAgeRef}>
        <option value='1'>1 Year</option>
        <option value='2'>2 Years</option>
        <option value='3'>3 Years</option>
        <option value='4'>4 Years</option>
        <option value='5+'>5+ Years</option>
      </select>
      <label>About your cat:</label>
      <input type='about me' placeholder='about me' ref={aboutMeRef} />
      <label>Picture of your cat:</label>
      <input type='file' placeholder='Add images here' ref={profilePicRef} />
      <button>Create Profile</button>
    </form>
  );
};

export default CreateAccountCat;
