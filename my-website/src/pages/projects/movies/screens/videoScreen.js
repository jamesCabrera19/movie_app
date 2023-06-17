import React, { useContext, useState, useRef, useEffect } from "react";
//
import NavigationContext from "../context/navigation";
import { Context as SettingsContext } from "../context/settingsContext";

import { Context as MovieContext } from "../context/movieContext";
//
import ReactPlayer from "react-player/lazy";
import Image from "next/image";
//
import { imageLoaderHighQuality, ImageLoader } from "../components/utils";
import { Text } from "../components/text";
//
import useMoviedb from "../hooks/useMoviedb";
import useVideoPlayTime from "../hooks/useVideoPlayTime";
import useFetchVideoLink from "../hooks/useFetchVideoLink";
import useLocalStorage from "../hooks/useLocalStorage";
import { genres } from "../components/utils";
//

//* ADDITIONAL MOVIE INFO
// URL: /movie/{movie_id}/credits
// URL: /movie/{movie_id}/reviews
// URL: /movie/{movie_id}/recommendations
// Define the list of movies and their genres

const styles = {
    VideoCategories: {
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
    },
    VideoContainer: {
        borderRadius: 10,
        overflow: "hidden",
        margin: 10,
    },
    VideoButtons: {
        display: "flex",
        justifyContent: "center",
        width: 200,
        borderRadius: 10,
        paddingTop: 15,
    },
    CastAndCrew: {
        container: {
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            width: "85%",
            margin: "auto",
        },
        imageContainer: {
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
        },
        textContainer: {
            height: 150,
            width: 100,
            borderRadius: 150 / 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 40,
        },
        lineBreaker: {
            borderTop: `1px solid #808080`,
            marginTop: 50,
            marginBottom: 50,
            width: "80%",
            alignSelf: "center",
        },
        reviewsContainer: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "85%",
            margin: "auto",
        },
        reviews: {
            width: 240,
            height: 300,
            overflowY: "scroll",
            margin: 20,
            borderRadius: 10,
            padding: 20,
        },
    },
};

// helper functions
const filterGenres = (movieGenres, allGenres) => {
    return allGenres.filter((el) => movieGenres.includes(el.id));
};

const CastAndCrew = ({ movie_id }) => {
    const { data, error, isLoading } = useMoviedb(movie_id); // returns movie information about the cast, crew and reviews

    const {
        state: { theme },
    } = useContext(SettingsContext);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
        <div
            style={{
                ...styles.CastAndCrew.textContainer,
                backgroundColor: theme.fontColor,
            }}
        >
            <p>{getInitials(name)}</p>
        </div>
    );

    if (data && !isLoading) {
        return (
            <>
                <div style={styles.CastAndCrew.container}>
                    {data.cast &&
                        data.cast.map((el) => (
                            <div key={el.id}>
                                <div style={styles.CastAndCrew.imageContainer}>
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
                <div style={styles.CastAndCrew.lineBreaker} />

                <div style={styles.CastAndCrew.reviewsContainer}>
                    {data.results.map((review) => (
                        <div
                            style={{
                                ...styles.CastAndCrew.reviews,
                                backgroundColor: theme.panelBackgroundColor,
                            }}
                        >
                            <Text color={theme.fontColor}>{review.author}</Text>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: theme.fontColor,
                                }}
                            >
                                {review.content}
                            </p>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};
const VideoButtons = ({ buttons, onClick }) => {
    const {
        state: { theme },
    } = useContext(SettingsContext);

    return buttons.map((el, idx) => (
        <div
            style={{
                ...styles.VideoButtons,
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
    const [playTime, handlePlay, handlePause, handleStop] = useVideoPlayTime();
    const [value, updatePlayTime, clear] = useLocalStorage("play_time");

    const videoPause = () => (e) => {
        updatePlayTime(playTime);
        handlePause(playTime);
    };
    const videoEnd = () => (e) => {
        updatePlayTime(playTime);
        handleStop();
    };

    return (
        <div style={styles.VideoContainer}>
            <ReactPlayer
                onPlay={() => handlePlay()}
                onPause={videoPause()}
                onEnded={videoEnd()}
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

const VideoCategories = ({ id, videoLanguage }) => {
    const { data, error, isLoading } = useFetchVideoLink(id, videoLanguage);
    // useFetchVideoLink returns an array of videos for the movieID provided.
    const [vids, setVids] = useState(undefined);

    const videoTypes = Object.keys(
        data.reduce((acc, cur) => {
            acc[cur.type] = true;
            return acc;
        }, {})
    ); /// this return an array of Strings ['trailers','Clip',...]

    const defaultVideos = data.filter((el) => el.type === "Trailer");
    //
    const filterVideoFunction = (type) => {
        const videos = data.filter((el) => el.type === type);
        setVids((prev) => (type ? videos : prev));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data && !isLoading) {
        return (
            <div style={styles.VideoCategories.container}>
                <div style={styles.VideoCategories.buttons}>
                    <VideoButtons
                        onClick={filterVideoFunction}
                        buttons={videoTypes}
                    />
                </div>

                <div style={styles.VideoCategories.videoContainer}>
                    {vids
                        ? renderVideoContainers(vids)
                        : renderVideoContainers(defaultVideos)}
                </div>
            </div>
        );
    }
};
const Overview = ({ title, release_date, genres, overview }) => {
    const {
        state: { theme },
    } = useContext(SettingsContext);

    const styles = {
        container: {
            position: "absolute",
            bottom: 0,
            marginBottom: 0,
            width: 1080,
            padding: 20,
            // border: "1px solid red",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            overflow: "hidden",
        },
    };
    return (
        <div style={styles.container}>
            <Text variant={"headlineLarge"} color={theme.backgroundColor}>
                {title}
            </Text>
            <Text color={theme.backgroundColor}>
                Release Date: {release_date}
            </Text>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text color={theme.backgroundColor}>
                    Genres:{" "}
                    {genres.map((el, idx) => (
                        <React.Fragment key={el.id}>
                            {el.name}
                            {idx !== genres.length - 1 && ", "}
                        </React.Fragment>
                    ))}
                </Text>
            </div>
            <Text color={theme.backgroundColor}>{overview}</Text>
        </div>
    );
};

const VideoScreen = () => {
    const { state } = useContext(MovieContext);
    //
    const {
        params: { id },
    } = useContext(NavigationContext);
    const {
        state: { videoAudioLanguage },
    } = useContext(SettingsContext);
    //

    const [movie] = state.movies.filter((el) => el.id === id);
    //
    const movieGenres = filterGenres(movie.genre_ids, genres);
    //

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 1080,
                    alignSelf: "center",
                    position: "relative",
                }}
            >
                <Image
                    alt="Movie Poster"
                    loader={imageLoaderHighQuality}
                    src={movie.backdrop_path}
                    width={1080}
                    height={680}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                />
                <Overview
                    title={movie.title}
                    release_date={movie.release_date}
                    genres={movieGenres}
                    overview={movie.overview}
                />
            </div>

            <VideoCategories id={id} videoLanguage={videoAudioLanguage} />

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
