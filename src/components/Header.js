import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adduser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/contants'


const Header = () => {
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut =  () => {
        signOut(auth).then(() => {
            
        }).catch((error) => {

        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user)
            {
                const {uid, email, displayName} = user;
                dispatch(adduser({uid : uid, email:email, displayName : displayName}));
                navigate("/browse")
            }
            else
            {
                dispatch(removeUser());
                navigate("/")
            }
        });

        return () => unsubscribe();
    }, []);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>

    <img className='w-44' src={LOGO} alt='logo'  />
    {
        user && (<div className='flex '>
    <h1>{user?.displayName}</h1>
        <button onClick={handleSignOut} className='px-4 py-1 text-lg '>Sign Out</button>
    </div>) 
    }
        </div>
  )
}

export default Header