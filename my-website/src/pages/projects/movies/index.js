import { useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

//
import { Provider as MovieProvider } from "../../../../context/movieContext";
import { Context as MovieContext } from "../../../../context/movieContext";

import MoviesApp from "./app";

const App = () => {
    const { fetchMovies } = useContext(MovieContext);
    useEffect(() => {
        fetchMovies();
    }, []);

    return <MoviesApp />;
};

export default function Movies() {
    const router = useRouter();

    return (
        <MovieProvider>
            <App />
        </MovieProvider>
    );
}
