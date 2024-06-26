import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstants';

const GptSearchBar = () => {

    const langKey = useSelector(store => store.config.lang);
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className=' bg-black w-1/2 grid grid-cols-12 '>
            <input type='text' placeholder={lang[langKey].gptSearchPlaceHolder} className='p-4 m-4 col-span-9'/>
            <button className='px-4 py-2 bg-red-700 text-white rounded-lg col-span-3 m-4'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar