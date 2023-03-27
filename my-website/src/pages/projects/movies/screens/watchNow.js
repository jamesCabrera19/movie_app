import React, { useContext, useCallback, useState, useEffect } from "react";
const { v4: uuidv4 } = require("uuid");
//
import Image from "next/image";
//
import { ImageLoader, genres } from "../components/utils";
import { Context as MovieContext } from "../context/movieContext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";

import { MovieOrganizer } from "../components/Helpers";
import useUpNext from "../hooks/useUpNext";
//
import { CardRow } from "../components/cardRow";

//
const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

function ScreenCover({}) {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const src = movies.filter(
        (e, i) => i <= Math.floor(Math.random() * movies.length)
    )[0];
    const handleClick = () => (e) => {
        console.log("Open Movie");
    };

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
            onClick={handleClick()}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={src ? src.backdrop_path : img_src}
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
                <CardRow movieIDS={state.upNext} />
            </div>
        </>
    );
};

function WatchNow({ props }) {
    const { state } = useContext(MovieContext);
    const movieLibrary = new MovieOrganizer(state.movies, genres, true);
    const movies = movieLibrary.moviesByGenre();

    // [{movie_genre:'Movie Genre: Action',id:'random string',
    // ids:['Array of movies with the same Genre']}]
    const returnMovieIds = useCallback(
        // returns array of objects
        (obj = {}) => {
            const objs = [];
            for (const [key, value] of Object.entries(obj)) {
                if (value.length > 0 && !Array.isArray(key)) {
                    if (value.length > 3) {
                        objs.push({
                            id: uuidv4(),
                            header_text: key,
                            ids: Array.from(value),
                        });
                    }
                }
            }
            return objs;
        },
        [movies]
    );

    return (
        <div>
            <UpNext />

            {returnMovieIds(movies).map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    bigRow={true}
                    movieIDS={el.ids}
                />
            ))}
        </div>
    );
}
export default WatchNow;
