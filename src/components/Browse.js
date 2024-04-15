import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/contants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'

const Browse = () => {

    const nowPlayingMovies = useNowPlayingMovies();
    usePopularMovies();

  return (
    <div>
        <Header/>
        <MainContainer/>
        <SecondaryContainer/>
    </div>
  )
}

export default Browse