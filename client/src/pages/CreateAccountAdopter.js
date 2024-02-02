// Modules
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccountAdopter = () => {
  const navigate = useNavigate();

  // State
  const emailRef = useRef();
  const nameRef = useRef();
  const aboutMeRef = useRef();
  // const imageUrl = useRef();
  const professionRef = useRef();
  const experienceRef = useRef();

  // Function to handle login submit button
  const handleSubmit = async e => {
    e.preventDefault();

    const newAdopter = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      aboutMe: aboutMeRef.current.value,
      // profilePic: profilePicRef.current.value,
      imageUrl: 'https://i.imgur.com/OckVkRo.jpeg',
      profession: professionRef.current.value,
      experience: experienceRef.current.value,
    };

    console.log('* Profile to be added to db: ', newAdopter);

    try {
      const adopterResponse = await axios.post(
        'api/login/createAdopterProfile',
        newAdopter
      );

      if (adopterResponse) {
        console.log('* New adopter profile created, _id: ', adopterResponse.data);
        navigate('/CardsPage');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Return component
  return (
    <div>
      <form className='create-profile-page' onSubmit={handleSubmit}>
        <h3>Create your adopter profile!</h3>
        <label>Email: </label>
        <input type='email' placeholder='email' ref={emailRef} />
        <label>Name: </label>
        <input type='text' placeholder='full name' ref={nameRef} />
        <label>About Me: </label>
        <input type='about me' placeholder='about me' ref={aboutMeRef} />
        {/* <label>Add images here: </label>
        <input type='file' placeholder='image url' ref={profilePicRef} /> */}
        <label>Profession: </label>
        <input type='profession' placeholder='profession' ref={professionRef} />
        <label>Experience w/ Cats: </label>
        <select name='age' id='age' ref={experienceRef}>
          <option value='1'>0-6 months</option>
          <option value='2'>1-2 Years</option>
          <option value='3'>2-5 Years</option>
          <option value='4'>5+ Years</option>
        </select>
        {/* <Link to='/AdopterCardsPage'> */}
        <button>Create Profile</button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default CreateAccountAdopter;
