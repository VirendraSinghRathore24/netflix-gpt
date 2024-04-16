import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/contants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import GptSearch from './GptSearch'

const Browse = () => {

    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const nowPlayingMovies = useNowPlayingMovies();
    usePopularMovies();

  return (
    <div>
        <Header/>
        {
            showGptSearch ? <GptSearch/> : 
                <div>
                <MainContainer/>
        <SecondaryContainer/>
                </div>
            
        }
        
        
    </div>
  )
}

export default Browse