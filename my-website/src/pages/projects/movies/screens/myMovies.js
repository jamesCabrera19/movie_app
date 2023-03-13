import { useContext, useEffect, useState, useRef, Children } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Text } from "../components/text";
import { theme as movieTheme } from "../styles";
import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import { ImageLoader } from "../components/utils";
import MyCard from "../components/myCard";

//

function MyMovies({}) {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const theme = movieTheme;

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
            }}
        >
            {movies.map((el) => (
                <TheModal item={el}>
                    <MyCard
                        poster={el.backdrop_path}
                        movieID={el.id}
                        sizePercent={-0.0}
                        buttonPosition={null}
                    />
                </TheModal>
            ))}
        </div>
    );
}

export default MyMovies;
