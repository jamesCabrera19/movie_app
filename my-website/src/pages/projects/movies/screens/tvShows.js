import { useContext, useEffect, useState, useRef, Children } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Text } from "../components/text";
import { Context as MovieContext } from "../context/movieContext";
import { Context as ThemeContext } from "../context/themeContext";

import { ImageLoader } from "../components/utils";
import TestComponent from "../components/testComponent";
import { CardRow } from "../components/cardRow";
import { matrix, fib } from "../components/codeChallenges";

export default function TVShows() {
    const data = [
        {
            id: 0,
            header_text: "Highlights",
            ids: [],
        },
        {
            id: 1,
            header_text: "TV Channels",
            ids: [],
        },
        {
            id: 2,
            header_text: "Premiers",
            ids: [],
        },
        {
            id: 3,
            header_text: "Trending TV Shows",
            ids: [],
        },
        {
            id: 4,
            header_text: "Binge-Worthy Television",
            ids: [],
        },
        {
            id: 5,
            header_text: "TV Shows by Genre",
            ids: [],
        },
    ];

    console.log(fib(10));
    return (
        <div>
            <div style={{ marginLeft: 20 }}>
                <Text variant="headlineLarge">TV Shows</Text>
            </div>

            <div style={{ borderTop: "1px solid red", margin: "20px 40px" }} />
            {data.map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    bigRow={true}
                    seeAll={true}
                />
            ))}
        </div>
    );
}
