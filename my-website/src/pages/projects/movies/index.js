import { useContext, useEffect } from "react";
import { Provider as MovieProvider } from "./context/movieContext";
import { Context as MovieContext } from "./context/movieContext";
import { Context as AuthContext } from "./context/AuthContext";
import MoviesApp from "./app";
import { useRouter } from "next/router";

// This is a video streaming application built with the React createContext API, Axios, NodeJS, Express, Next JS, and React Navigation.

// The program is intended for two platforms: iOS and web devices.
// Both versions employ NodeJS, Express, and JWT for user authentication, react createContext for state management, and MongoDB for data storage.

// In addition, the app has CRUD operations, react Hooks, and a AI system recommendation system.
const App = ({}) => {
    const {
        state: { token },
    } = useContext(AuthContext);
    //
    const { fetchData } = useContext(MovieContext);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        } else {
            // authenticated data fetching
            fetchData();
            // fetchData("get_tv", "tv");
        }
    }, [token]);

    return <MoviesApp />;
};

export default function Movies() {
    return (
        <MovieProvider>
            <App />
        </MovieProvider>
    );
}
