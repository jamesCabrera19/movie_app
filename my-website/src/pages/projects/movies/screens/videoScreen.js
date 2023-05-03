import React, { useContext, useCallback, useEffect, useState } from "react";
import NavigationContext from "../context/navigation";
import { Context as ThemeContext } from "../context/themeContext";

import { Context as MovieContext } from "../context/movieContext";
import ReactPlayer from "react-player";
import useFetchVideoLink from "../hooks/useFetchVideoLink";
import Image from "next/image";
import { ImageLoader } from "../components/utils";
import { Text } from "../components/text";
const { v4: uuidv4 } = require("uuid");

//
//
// console.log(video, isLoading, error);
// console.log(video);
// id: "63cfb8d0b6cff1008eed43ca"
// iso_3166_1: "US"
// iso_639_1: "en"
// key: "VEuAbbxflXk"
// name: "Panic Attack Scene"
// official: true
// published_at: "2023-01-23T22:59:40.000Z"
// site: "YouTube"
// size: 1080
//type: "Behind the Scenes"

const VideoContainer = ({ id }) => {
    return (
        <div
            style={{
                borderRadius: 10,
                overflow: "hidden",
                margin: 10,
            }}
        >
            <ReactPlayer
                width={320}
                height={180}
                url={`https://www.youtube.com/watch?v=${id}`}
            />
        </div>
    );
};
const renderVideoContainers = (videos) => {
    return videos.map((video) => (
        <VideoContainer key={video.key} id={video.key} />
    ));
};
const VideoCategories = ({ id }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    const { data, error, isLoading } = useFetchVideoLink(id, "en");
    const [vids, setVids] = useState(undefined);

    const videoTypes = Object.keys(
        data.reduce((acc, cur) => {
            acc[cur.type] = true;
            return acc;
        }, {})
    ); /// this return an array of Strings ['trailers','Clip',...]
    const defaultVideos = data.filter((el) => el.type === "Trailer");
    const filterVideoFunction = (type) => {
        setVids(() => {
            if (type) {
                return data.filter((el) => el.type === type);
            }
        });
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
        },
        categories: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
        videoContainer: {
            justifyContent: "space-evenly",
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            marginBottom: 60,
        },
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>loading...</div>;
    }
    return (
        <div style={styles.container}>
            <div style={styles.categories}>
                {videoTypes.map((el, idx) => (
                    <div
                        style={{
                            width: 200,
                            backgroundColor: theme.panelBackgroundColor,
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: 10,
                            paddingTop: 15,
                        }}
                        role="button"
                        tabIndex="0"
                        onClick={() => filterVideoFunction(el)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                filterVideoFunction(el);
                            }
                        }}
                        key={idx}
                    >
                        <Text color={theme.fontColor}>{el}</Text>
                    </div>
                ))}
            </div>

            <div style={styles.videoContainer}>
                {vids
                    ? renderVideoContainers(vids)
                    : renderVideoContainers(defaultVideos)}
            </div>
        </div>
    );
};
const VideoScreen = () => {
    const { state } = useContext(MovieContext);
    const {
        params: { id },
    } = useContext(NavigationContext);
    const [movie] = state.movies.filter((el) => el.id === id);
    //

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{ margin: "auto" }}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={movie.backdrop_path}
                    width={1080}
                    height={600}
                    quality={100}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                />
            </div>
            <div
                style={{
                    // width: 500,
                    // margin: "-200px auto 80px auto",
                    // border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Text>{movie.overview}</Text>
            </div>

            <VideoCategories id={id} />
        </div>
    );
};

export default VideoScreen;
