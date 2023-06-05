import { useState, useEffect } from "react";
import movieApi from "../movieAPI";
import axios from "axios";
//
export default (movie_id, language) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let id = movie_id ? movie_id : 76600;
            setIsLoading(true);
            let lan = language ? language.toLowerCase() : "en";
            try {
                const response = await movieApi.get(
                    `/movie/${id}/videos?language=${lan}-US`
                );
                console.log(response.data.results);
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
