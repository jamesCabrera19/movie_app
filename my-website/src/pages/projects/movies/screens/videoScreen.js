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
};

// helper functions
const filterGenres = (movieGenres, allGenres) => {
    return allGenres.filter((el) => movieGenres.includes(el.id));
};

const CastAndReviews = ({ movie_id, type }) => {
    const { data, error, isLoading } = useMoviedb(movie_id, type); // returns movie information about the cast, crew and reviews

    const {
        state: { theme },
    } = useContext(SettingsContext);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const getNameInitials = (string) => {
        const nameArray = string.split(" ");
        const firstInitial = nameArray[0].charAt(0);
        const lastInitial = nameArray[nameArray.length - 1].charAt(0);
        return firstInitial + lastInitial;
    };
    const styles = {
        castContainer: {
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
        },

        reviewsContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowX: "scroll",
        },
        reviews: {
            height: 300,
            minWidth: 240,
            overflowY: "scroll",
            margin: "20px 30px 20px 0",
            padding: 20,
            borderRadius: 10,
            backgroundColor: theme.panelBackgroundColor,
        },
        imageContainer: {
            height: 150,
            width: 150,
            borderRadius: 150 / 2,
        },

        initialsText: {
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
                ...styles.initialsText,
                backgroundColor: theme.fontColor,
            }}
        >
            <Text color={theme.backgroundColor} variant="headlineSmall">
                {getNameInitials(name)}
            </Text>
        </div>
    );

    if (data && !isLoading) {
        return (
            <div style={{ width: "85%", margin: "auto" }}>
                <div style={styles.castContainer}>
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

                {/*  */}
                <div
                    style={{
                        borderTop: `1px solid #808080`,
                        marginTop: 50,
                        marginBottom: 50,
                        alignSelf: "center",
                    }}
                />
                {/*  */}
                <div style={styles.reviewsContainer}>
                    {data.results.map((review) => (
                        <div style={styles.reviews}>
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
            </div>
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
                backgroundColor: theme.panelBackgroundColor,
                display: "flex",
                justifyContent: "center",
                width: 200,
                borderRadius: 10,
                paddingTop: 15,
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

const VideoCategories = ({ id, videoLanguage, type }) => {
    const { data, error, isLoading } = useFetchVideoLink(
        id,
        videoLanguage,
        type
    );
    // useFetchVideoLink returns an array of videos for the movieID provided.
    const [vids, setVids] = useState(undefined);
    //
    /// this return an array of Strings ['trailers','Clip',...]
    const videoTypes = Object.keys(
        data.reduce((acc, cur) => {
            acc[cur.type] = true;
            return acc;
        }, {})
    );
    //
    const defaultVideos = data.filter((el) => el.type === "Trailer");
    //
    const filterVideosByType = (type) => {
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
                        onClick={filterVideosByType}
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
const MovieOverview = ({ title, release_date, genres, overview }) => {
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
            borderRadius: 5,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            background:
                "linear-gradient(to top, rgba(220, 220, 220, 0.9), rgba(220, 220, 220, 0.1))",
        },
    };
    return (
        <div style={styles.container}>
            <Text variant={"headlineLarge"} color={theme.backgroundColor}>
                {title}
            </Text>
            <>
                <Text color={theme.backgroundColor}>Release Date</Text>
                <div style={{ marginTop: -20 }}>
                    <Text color={theme.backgroundColor}>{release_date}</Text>
                </div>
            </>

            <>
                <Text color={theme.backgroundColor}>Genres</Text>
                <div style={{ marginTop: -20 }}>
                    <Text color={theme.backgroundColor}>
                        {genres.map((el, idx) => (
                            <React.Fragment key={el.id}>
                                {el.name}
                                {idx !== genres.length - 1 && ", "}
                            </React.Fragment>
                        ))}
                    </Text>
                </div>
            </>
            <Text color={theme.backgroundColor}>{overview}</Text>
        </div>
    );
};

const VideoScreen = () => {
    const {
        state: { tv_shows, movies },
    } = useContext(MovieContext);
    //
    const {
        params: { id, type },
    } = useContext(NavigationContext);
    const {
        state: { videoAudioLanguage },
    } = useContext(SettingsContext);
    //

    // console.log(id, type);

    let movie = null;
    let movieType = type; // TV_SHOWS, MOVIES, MY_MOVIES
    switch (movieType) {
        case "TV_SHOWS":
            [movie] = tv_shows.filter((el) => el.id === id);
            break;
        case "MOVIES":
            [movie] = movies.filter((el) => el.id === id);
            break;
        case "MY_MOVIES":
            [movie] = movies.filter((el) => el.id === id);
            movieType = "MOVIES"; //
            break;
        default:
            break;
    }
    //
    if (!movie) {
        return null;
    }

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
                <MovieOverview
                    title={movie.title}
                    release_date={movie.first_air_date || movie.release_date}
                    genres={movieGenres}
                    overview={movie.overview}
                />
            </div>

            <VideoCategories
                id={movie.id}
                videoLanguage={videoAudioLanguage}
                type={movieType}
            />

            <div
                style={{
                    borderTop: `1px solid #808080`,
                    marginBottom: 50,
                    width: "85%",
                    alignSelf: "center",
                }}
            />
            <CastAndReviews movie_id={movie.id} type={movieType} />
            <div
                style={{
                    borderTop: `1px solid #808080`,
                    marginBottom: 50,
                    width: "85%",
                    alignSelf: "center",
                }}
            />
        </div>
        // <></>
    );
};

export default VideoScreen;
