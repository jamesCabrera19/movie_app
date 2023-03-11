import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useCallback,
} from "react";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//
import { ImageLoader, genres } from "../components/utils";
import { Context as MovieContext } from "../context/movieContext";

import NavigationContext from "../context/navigation";

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
    const { handleNavigation, params } = useContext(NavigationContext);
    const {
        state: { movies },
    } = useContext(MovieContext);

    const data = [
        {
            id: 0,
            header_text: "Popular",
            ids: [],
        },
        {
            id: 1,
            header_text: "Top Rated",
            ids: [],
        },
        {
            id: 2,
            header_text: "Animated",
            ids: [],
        },
        {
            id: 3,
            header_text: "Upcoming",
            ids: [],
        },
    ];

    const helpers = {
        getIds: function (arr = []) {
            return arr.map((el) => el.id);
        },
        getNames: function (arr = []) {
            return arr.map((el) => el.name);
        },
        filterMovies: function (arr = [], target = Number, getIds = Boolean) {
            if (getIds) {
                return this.getIds(
                    arr.filter(({ genre_ids }) => genre_ids.includes(target))
                );
            }
            return arr.filter(({ genre_ids }) => genre_ids.includes(target));
        },
        genresMap: function (genres = [], movies = []) {
            return genres.map(({ id }) => this.filterMovies(movies, id, true));
        },
        moviesByGenre: function (genres = [], movies = []) {
            const names = this.getNames(genres);
            const obj = {};
            const m = this.genresMap(genres, movies); //[[]]
            for (let i = 0; i < m.length; i++) {
                const element = m[i];
                const currentKey = names[i];
                obj[currentKey] = element;
            }
            return obj;
        },
    };

    console.log(params);
    // console.log(helpers.genresMap(genres, movies));
    // console.log(helpers.filterMovies(movies, 28)[0].id);

    // steps => find Genre => push item to selectedGenres => filterGenre()

    return (
        <>
            <MovieCover />
            {data.map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    bigRow={true}
                    movieIDS={[]}
                />
            ))}
        </>
    );
}
export default WatchNow;
