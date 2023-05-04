import { useState, useEffect } from "react";
import movieApi from "../movieAPI";
import axios from "axios";
//
export default (movie_id, language) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // https://api.themoviedb.org/3/movie/315162/videos?api_key=1fa86633efa961a3d2faa3b36d6975c4&language=es-US?
    useEffect(() => {
        const fetchData = async () => {
            let id = movie_id ? movie_id : 76600;
            setIsLoading(true);
            try {
                const response = await movieApi.get(
                    `/movie/${id}/videos?language=${language}-US`
                );

                setData(response.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [movie_id, language]);

    return { data, error, isLoading };
};
