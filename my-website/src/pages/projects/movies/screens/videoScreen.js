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
const CastAndCrew = ({ movie_id }) => {
    const { data, error, isLoading } = useMoviedb(movie_id); // returns movie information about the cast, crew and reviews

    const {
        state: { theme },
    } = useContext(ThemeContext);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const styles = {
        container: {
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
        },
        imageContainer: {
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
        },
        textContainer: {
            backgroundColor: theme.fontColor,
            height: 150,
            width: 100,
            borderRadius: 150 / 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 40,
        },
    };
    const getInitials = (string) => {
        const nameArray = string.split(" ");
        const firstInitial = nameArray[0].charAt(0);
        const lastInitial = nameArray[nameArray.length - 1].charAt(0);
        return firstInitial + lastInitial;
    };
    const renderImage = (el) => (
        <Image
            alt={el.name}
            loader={ImageLoader}
            src={el.profile_path}
            width={100}
            height={150}
            style={{ borderRadius: 150 / 2 }}
        />
    );
    const renderText = (name) => (
        <div style={styles.textContainer}>
            <p>{getInitials(name)}</p>
        </div>
    );

    if (data && !isLoading) {
        return (
            <>
                <div style={styles.container}>
                    {data.cast &&
                        data.cast.map((el) => (
                            <div key={el.id}>
                                <div style={styles.imageContainer}>
                                    {el.profile_path
                                        ? renderImage(el)
                                        : renderText(el.name)}
                                </div>

                                <div>
                                    <p style={{ color: theme.fontColor }}>
                                        {el.name}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: theme.fontColor,
                                        }}
                                    >
                                        {el.character}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div
                    style={{ border: "1px solid red", height: 200, width: 200 }}
                >
                    <Text>{data.results[0].author}</Text>
                    <p style={{ fontSize: 14, color: theme.fontColor }}>
                        {data.results[0].content}
                    </p>
                </div>
            </>
        );
    }
};
const VideoButtons = ({ buttons, onClick }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return buttons.map((el, idx) => (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                width: 200,
                borderRadius: 10,
                paddingTop: 15,
                backgroundColor: theme.panelBackgroundColor,
            }}
            role="button"
            tabIndex="0"
            onClick={() => onClick(el)}
            key={idx}
        >
            <Text color={theme.fontColor}>{el}</Text>
        </div>
    ));
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
const renderVideoContainers = (videos) => {
    return videos.map((video) => (
        <VideoContainer key={video.key} id={video.key} />
    ));
};
const VideoCategories = ({ id }) => {
    const { data, error, isLoading } = useFetchVideoLink(id, "en");
    // useFetchVideoLink returns an array of videos for the movie provided.
    const [vids, setVids] = useState(undefined);

    const videoTypes = Object.keys(
        data.reduce((acc, cur) => {
            acc[cur.type] = true;
            return acc;
        }, {})
    ); /// this return an array of Strings ['trailers','Clip',...]
    const defaultVideos = data.filter((el) => el.type === "Trailer");

    const filterVideoFunction = (type) =>
        setVids(type ? data.filter((el) => el.type === type) : undefined);

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
            flexWrap: "wrap",
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

    if (data && !isLoading) {
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
    }
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
    // *http://localhost:3000/projects/movies
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
            <div
                style={{
                    borderTop: `1px solid #808080`,
                    marginBottom: 50,
                    width: "80%",
                    alignSelf: "center",
                }}
            />
            <CastAndCrew movie_id={id} />
        </div>
    );
};

export default VideoScreen;
