import { useState, useEffect } from "react";
import movieApi from "../movieAPI";
import axios from "axios";
//
export default (movie_id, language, type) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            //
            let id = movie_id ? movie_id : 76600;
            let lan = language ? language.toLowerCase() : "en";
            // api endpoint
            let endpoint = !type
                ? `/movie/${id}/videos?language=${lan}-US`
                : `/tv/${id}/videos?language=${lan}-US`;
            try {
                const response = await movieApi.get(endpoint);
                // console.log(response.data.results);
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
