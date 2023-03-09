import React, { useContext, useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//
import NavigationContext from "../context/navigation";

//
import { CardRow } from "../components/cardRow";
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
//
function MovieCover({}) {
    const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

    const handleClick = () => (e) => {
        console.log("Opent Modal");
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
        <div style={styles.container}>
            <div
                style={{ ...styles.imageContainer, ...styles.flex }}
                onClick={handleClick("abcd")}
            >
                <Image
                    alt="Movie Poster"
                    // loader={ImageLoader}
                    src={img_src}
                    quality={100}
                    width={733.6}
                    height={412.8}
                    style={{ borderRadius: 10 }}
                />
            </div>

            <CardRow onClick={handleClick} />
        </div>
    );
}

function WatchNow() {
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
