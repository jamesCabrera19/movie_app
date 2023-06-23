import React, { useState, useEffect } from "react";
import movieApi from "../movieAPI";

// URL: /movie/{movie_id}/credits
// URL: /movie/{movie_id}/reviews
// URL: /movie/{movie_id}/recommendations

export default (movie_id, type) => {
    const [data, setData] = useState({ results: [], crew: [], cast: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            //
            let id = movie_id ? movie_id : 76600;
            const tvEndpoints = [
                `/tv/${id}/credits?language=en-US`,
                `/tv/${id}/reviews?language=en-US&page=1`,
            ];
            const movieEndpoints = [
                `/movie/${id}/credits`,
                `/movie/${id}/reviews`,
            ];

            const endpoint = type === "MOVIES" ? movieEndpoints : tvEndpoints;

            try {
                const responses = await Promise.all(
                    endpoint.map((endpoint) => movieApi.get(endpoint))
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
