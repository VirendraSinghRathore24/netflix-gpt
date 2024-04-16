import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adduser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/contants'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'


const Header = () => {
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut =  () => {
        signOut(auth).then(() => {
            
        }).catch((error) => {

        })
    }
    const handleGptSearch = () => {
        dispatch(toggleGptSearchView())
    }

    const handleLangChange = (e) => {
        dispatch(changeLanguage(e.target.value))
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
        user && (<div className='flex justify-center items-center gap-x-4 text-lg'>
        { showGptSearch && 
            <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLangChange}>
            {
                SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
            }
            </select>
        }
        <button onClick={handleGptSearch} className='text-white px-4 py-1 bg-purple-800 rounded-lg'>
        {showGptSearch ? "Home" : "GPT Search"}</button>
        <h1 className='text-white'>{user?.displayName}</h1>
        <button onClick={handleSignOut} className='px-4  text-white'>Sign Out</button>
    </div>) 
    }
        </div>
  )
}

export default Header