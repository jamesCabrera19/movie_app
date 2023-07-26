import React, { useContext } from "react";
// context
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
// components
import { CardRow, CardRowNoModal } from "../components/cardRow";
import Image from "next/image";
// helper functions
import { ImageLoader, genres } from "../components/utils";
import { MovieOrganizer } from "../components/Helpers";
import memoizeOne from "memoize-one";
//
const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
//
// helper functions
const getRandomItem = memoizeOne((array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
});

//
function ScreenCover({ type }) {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const { screenNavigator } = useContext(NavigationContext);

    const randomMovie = getRandomItem(movies);

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
                type: type,
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
const UpNext = ({ type }) => {
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
                <ScreenCover type={type} />
                <CardRowNoModal movieIDS={state.upNext} type={type} />
            </div>
        </>
    );
};

function WatchNow({}) {
    const type = "MOVIES"; // type is used for data filtration
    //
    const { state } = useContext(MovieContext);
    //
    const movieLibrary = new MovieOrganizer(state.movies, genres, true);
    // movies is an Array of objects with a genre as key and movie ids as value
    const movies = movieLibrary.moviesByGenre();

    const cardRows = Object.entries(movies)
        .sort(([keyA, idsA], [keyB, idsB]) => idsB.length - idsA.length)
        .map(([key, ids]) => {
            return ids.length === 0 ? null : (
                <CardRow key={key} title={key} IDS={ids} type={type} />
            );
        });

    return (
        <div>
            <UpNext type={type} />
            {cardRows}
        </div>
    );
}
export default WatchNow;
