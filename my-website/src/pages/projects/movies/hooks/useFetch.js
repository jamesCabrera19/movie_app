import { useContext, useEffect, useState } from "react";
import movieApi from "../movieAPI";

export default ({ endpoint, render }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responses = await Promise.all(
                    endpoint.map((endpoint) => movieApi.get(endpoint))
                );
                const responseData = await Promise.all(
                    responses.map((response) => response.data)
                );
                setData(responseData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return render({ data, error, isLoading });
};
