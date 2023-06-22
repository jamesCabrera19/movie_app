import React, { useContext } from "react";
//
import Image from "next/image";
//
import { ImageLoader, genres } from "../components/utils";
import { Context as MovieContext } from "../context/movieContext";
import { Context as SettingsContext } from "../context/settingsContext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import NavigationContext from "../context/navigation";

import { MovieOrganizer } from "../components/Helpers";
//
import { CardRow, CardRowNoModal } from "../components/cardRow";

//
const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

function ScreenCover({}) {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const { screenNavigator } = useContext(NavigationContext);

    const randomMovie = movies.filter(
        (e, i) => i <= Math.floor(Math.random() * movies.length)
    )[0];

    const styles = {
        flex: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
            // border: "1px solid red",
        },
        imageContainer: {
            width: "100%",
            height: 412.8,
            // border: "1px solid blue",
        },
    };

    return (
        <div
            style={{ ...styles.imageContainer, ...styles.flex }}
            onClick={screenNavigator("Video Screen", {
                id: randomMovie ? randomMovie.id : 640146,
            })}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={randomMovie ? randomMovie.backdrop_path : img_src}
                quality={100}
                width={733.6}
                height={412.8}
                style={{ borderRadius: 10 }}
            />
        </div>
    );
}
const UpNext = ({}) => {
    const { state } = useContext(LikedMoviesContext);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ScreenCover />
                <CardRowNoModal movieIDS={state.upNext} />
            </div>
        </>
    );
};

function WatchNow({}) {
    const { state } = useContext(MovieContext);

    const movieLibrary = new MovieOrganizer(state.movies, genres, true);
    // movies is an Array of objects with a genre as key and movie ids as value
    const movies = movieLibrary.moviesByGenre();

    const cardRows = Object.entries(movies)
        .sort(([keyA, idsA], [keyB, idsB]) => idsB.length - idsA.length)
        .map(([key, ids]) => {
            return ids.length === 0 ? null : (
                <CardRow key={key} title={key} IDS={ids} type={"MOVIES"} />
            );
        });

    return (
        <div>
            <UpNext />
            {cardRows}
        </div>
    );
}
export default WatchNow;
