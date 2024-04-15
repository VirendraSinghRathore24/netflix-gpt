import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { adduser } from '../utils/userSlice';
import { BG_URL } from '../utils/contants';

function Login() {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();
  

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm =  () =>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
       const message =  checkValidateData(email.current.value, password.current.value);
       setErrorMessage(message);

       if(message) return;

       if(!isSignInForm)
       {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName : name.current.value
                }).then(() => {
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(adduser({uid : uid, email:email, displayName : displayName}));

                    console.log(user);
                   
                })
                .catch((error) => {

                })
                
            })
            .catch((error) => {
                setErrorMessage(error.code +  " - " + error.message);
            })
       }
       else
       {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
               
            })
            .catch((error) => {
                setErrorMessage(error.code +  " - " + error.message);
            })
       }
    }
  return (
    <div >
    <Header/>
    <div className='absolute'>
        <img src={BG_URL}
        alt='logo1'/>
    </div>
    <form onSubmit={(e) => {e.preventDefault()}} className='absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {
            !isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>
        }
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
        
        
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
        <p className='text-red-500 font-bold text-lg py-2'>{errMessage}</p>
        <button className='my-6 p-2 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='p-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up Now" : "Already registered? Sign In now"}</p>
    </form>
</div>
  
)}

export default Login