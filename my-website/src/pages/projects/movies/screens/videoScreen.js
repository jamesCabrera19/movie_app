import React, { useContext, useCallback, useEffect, useState } from "react";
import NavigationContext from "../context/navigation";
import { Context as ThemeContext } from "../context/themeContext";

import { Context as MovieContext } from "../context/movieContext";
import ReactPlayer from "react-player/lazy";
import useFetchVideoLink from "../hooks/useFetchVideoLink";
import Image from "next/image";
import { ImageLoader } from "../components/utils";
import { Text } from "../components/text";
const { v4: uuidv4 } = require("uuid");
import useMoviedb from "../hooks/useMoviedb";
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

//* ADDITIONAL MOVIE INFO
// URL: /movie/{movie_id}/credits
// URL: /movie/{movie_id}/reviews
// URL: /movie/{movie_id}/recommendations
const Test = ({ id }) => {
    const { data, error, isLoading } = useMoviedb(id);
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>loading...</div>;
    }

    if (data) {
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        overflowX: "scroll",
                        height: 300,
                    }}
                >
                    {data.cast?.map((el) => (
                        <div key={el.id}>
                            <div
                                style={{
                                    height: 150,
                                    width: 150,
                                    // border: "1px solid red",
                                    borderRadius: 150 / 2,
                                }}
                            >
                                {el.profile_path ? (
                                    <Image
                                        alt={el.name}
                                        loader={ImageLoader}
                                        src={el.profile_path}
                                        width={100}
                                        height={150}
                                        style={{ borderRadius: 150 / 2 }}
                                    />
                                ) : (
                                    <Text>{el.name}</Text>
                                )}
                            </div>
                            <Text>{el.name}</Text>
                            <Text>{el.character}</Text>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
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
                controls
                light
                width={320}
                height={180}
                url={`https://www.youtube.com/watch?v=${id}`}
            />
        </div>
    );
};
const VideoButtons = ({ buttons, onClick }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return buttons.map((el, idx) => (
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
            onClick={() => onClick(el)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    filterVideoFunction(el);
                }
            }}
            key={idx}
        >
            <Text color={theme.fontColor}>{el}</Text>
        </div>
    ));
};
const renderVideoContainers = (videos) => {
    return videos.map((video) => (
        <VideoContainer key={video.key} id={video.key} />
    ));
};
const VideoCategories = ({ id }) => {
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
            marginTop: 40,
        },
        buttons: {
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
            <div style={styles.buttons}>
                <VideoButtons
                    onClick={filterVideoFunction}
                    buttons={videoTypes}
                />
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
    const {
        state: { theme },
    } = useContext(ThemeContext);
    const { state } = useContext(MovieContext);
    const {
        params: { id },
    } = useContext(NavigationContext);
    const [movie] = state.movies.filter((el) => el.id === id);
    //

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
        },
        description: {
            display: "flex",
            position: "relative",
            margin: "auto",
            overflow: "hidden",
        },
        image: {
            borderRadius: 10,
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
        },
        text: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: 20,
            boxSizing: "border-box",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.description}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={movie.backdrop_path}
                    width={1080}
                    height={600}
                    quality={100}
                    style={styles.image}
                />
                <div style={styles.text}>
                    <Text color={theme.backgroundColor}>{movie.overview}</Text>
                </div>
            </div>

            <VideoCategories id={id} />
            <Test id={id} />
        </div>
    );
};

export default VideoScreen;
