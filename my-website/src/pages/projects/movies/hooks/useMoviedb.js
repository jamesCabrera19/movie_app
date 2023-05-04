import React, { useState, useEffect } from "react";
import movieApi from "../movieAPI";

// URL: /movie/{movie_id}/credits
// URL: /movie/{movie_id}/reviews
// URL: /movie/{movie_id}/recommendations

export default (movie_id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let id = movie_id ? movie_id : 76600;

            const endpoint1 = `/movie/${id}/credits`;
            const endpoint2 = `/movie/${id}/reviews`;

            setIsLoading(true);
            try {
                const responses = await Promise.all(
                    [endpoint1, endpoint2].map((endpoint) =>
                        movieApi.get(endpoint)
                    )
                );
                const responseData = await Promise.all(
                    responses.map((response) => response.data)
                );
                const newData = responseData.reduce(
                    (acc, curr) => {
                        return {
                            results: curr.results || acc.results,
                            crew: curr.crew || acc.crew,
                            cast: curr.cast || acc.cast,
                        };
                    },
                    { results: [], crew: [], cast: [] }
                );

                setData(newData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [movie_id]);

    return { data, error, isLoading };
};