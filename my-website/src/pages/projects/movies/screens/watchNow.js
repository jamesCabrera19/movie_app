import React, { useContext, useCallback } from "react";
import { uuid } from "uuidv4";
//
import Image from "next/image";
//
import { ImageLoader, genres } from "../components/utils";
import { Context as MovieContext } from "../context/movieContext";

import { MovieOrganizer } from "../components/Helpers";
//
import { CardRow } from "../components/cardRow";

//
const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

function MovieCover({}) {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const handleClick = () => (e) => {
        console.log("Open Movie");
    };

    const src = movies.filter(
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
        <div style={styles.container}>
            <div
                style={{ ...styles.imageContainer, ...styles.flex }}
                onClick={handleClick("abcd")}
            >
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={movies.length !== 0 ? src.backdrop_path : img_src}
                    quality={100}
                    width={733.6}
                    height={412.8}
                    style={{ borderRadius: 10 }}
                />
            </div>
            <CardRow />
        </div>
    );
}

function WatchNow({ props }) {
    const { state } = useContext(MovieContext);
    const movieLibrary = new MovieOrganizer(state.movies, genres, true);
    const movies = movieLibrary.moviesByGenre();

    // [{header_text:'Movie Genre: Action',id:'random string',
    // ids:['Array of movies with the same Genre']}]
    const returnMovieIds = useCallback(
        (obj = {}) => {
            const objs = [];
            for (const [key, value] of Object.entries(obj)) {
                if (value.length > 0 && !Array.isArray(key)) {
                    if (value.length > 3) {
                        objs.push({
                            id: uuid(),
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
        <>
            <MovieCover />
            {returnMovieIds(movies).map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    bigRow={true}
                    movieIDS={el.ids}
                />
            ))}
        </>
    );
}
export default WatchNow;
