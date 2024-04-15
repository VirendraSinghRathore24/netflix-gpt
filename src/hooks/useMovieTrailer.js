import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/contants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS);

        const json = await data.json();
        
        const filteredData = json.results.filter((x) => x.type === "Trailer")
        const trailer = filteredData.length ?  filteredData[0] : json.results[0];
        console.log(trailer);

        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideos();
    }, [])
}

export default useMovieTrailer;