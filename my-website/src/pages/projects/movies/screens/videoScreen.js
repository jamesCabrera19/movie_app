import React, { useContext, useState } from "react";
// context
import { Context as SettingsContext } from "../context/settingsContext";
import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
// components
import { Text } from "../components/text";
import Image from "next/image";
// helper functions
import { imageLoaderHighQuality, ImageLoader } from "../components/utils";
import ReactPlayer from "react-player/lazy";
import { genres } from "../components/utils";
// hooks
import useVideoPlayTime from "../hooks/useVideoPlayTime";
import useLocalStorage from "../hooks/useLocalStorage";
import DataFetcher from "../hooks/useFetch";
//
//
//

const renderText = (name, { fontColor, backgroundColor }) => {
    // returns the name initials
    const getNameInitials = (string) => {
        const nameArray = string.split(" ");
        const firstInitial = nameArray[0].charAt(0);
        const lastInitial = nameArray[nameArray.length - 1].charAt(0);
        return firstInitial + lastInitial;
    };

    return (
        <div
            style={{
                height: 150,
                width: 100,
                borderRadius: 150 / 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 40,
                backgroundColor: fontColor,
            }}
        >
            <Text color={backgroundColor} variant="headlineSmall">
                {getNameInitials(name)}
            </Text>
        </div>
    );
};
const RenderCast = ({ actors }) => {
    const {
        state: { theme },
    } = useContext(SettingsContext);

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
    };
    return (
        <div style={styles.container}>
            {actors.map((el) => (
                <div key={el.name}>
                    <div style={styles.imageContainer}>
                        {el.profile_path ? (
                            <Image
                                src={el.profile_path}
                                loader={ImageLoader}
                                alt={el.name}
                                height={150}
                                width={100}
                                style={{ borderRadius: 150 / 2 }}
                            />
                        ) : (
                            renderText(el.name, theme)
                        )}
                    </div>

                    <div>
                        <p style={{ color: theme.fontColor }}>{el.name}</p>
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
    );
};
const RenderReviews = ({ reviews }) => {
    const {
        state: {
            theme: { fontColor, panelBackgroundColor },
        },
    } = useContext(SettingsContext);

    const styles = {
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
            overflowX: "scroll",
        },
        reviews: {
            height: 300,
            minWidth: 240,
            maxWidth: 240,
            overflowY: "scroll",
            margin: "20px 30px 20px 0",
            padding: 20,
            borderRadius: 10,
            backgroundColor: panelBackgroundColor,
        },
    };
    return (
        <div style={styles.container}>
            {reviews.map((review) => (
                <div style={styles.reviews} key={review.id}>
                    <Text color={fontColor}>{review.author}</Text>
                    <p
                        style={{
                            fontSize: 14,
                            color: fontColor,
                        }}
                    >
                        {review.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

const CastAndReviewData = ({ movie_id, type }) => {
    const id = movie_id || 76600;

    const getEndpoints = (id, type) => {
        const baseEndpoint = type === "MOVIES" ? "/movie" : "/tv";
        return [
            `${baseEndpoint}/${id}/credits?language=en-US`,
            `${baseEndpoint}/${id}/reviews?language=en-US&page=1`,
        ];
    };
    const endpoint = getEndpoints(id, type);

    const reduceData = (array) => {
        return array.reduce(
            (acc, curr) => {
                return {
                    results: curr.results || acc.results,
                    cast: curr.cast || acc.cast,
                    // crew: curr.crew || acc.crew,
                };
            },
            { results: [], crew: [], cast: [] }
        );
    };

    return (
        <DataFetcher
            endpoint={endpoint}
            render={({ data, error, isLoading }) => (
                <>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>
                            <p>Error: {error.message}</p>
                        </div>
                    ) : (
                        <div style={{ width: "85%", margin: "auto" }}>
                            <RenderCast actors={reduceData(data).cast} />
                            <div
                                style={{
                                    borderTop: `1px solid #808080`,
                                    marginTop: 50,
                                    marginBottom: 50,
                                    alignSelf: "center",
                                }}
                            />
                            <RenderReviews reviews={reduceData(data).results} />
                        </div>
                    )}
                </>
            )}
        />
    );
};
// // // // // // // //

const VideoButtons = ({ buttons, onClick }) => {
    const {
        state: {
            theme: { panelBackgroundColor, fontColor },
        },
    } = useContext(SettingsContext);

    return buttons.map((el, idx) => (
        <div
            style={{
                backgroundColor: panelBackgroundColor,
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
            <Text color={fontColor}>{el}</Text>
        </div>
    ));
};
const VideoPlayer = ({ id }) => {
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
        <div style={{ borderRadius: 10, overflow: "hidden", margin: 10 }}>
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

const RenderVideos = ({ id, videoLanguage, type }) => {
    const getEndpoints = (id, type, lan) => {
        const baseEndpoint = type === "MOVIES" ? "/movie" : "/tv";
        return [`${baseEndpoint}/${id}/videos?language=${lan}-US`];
    };
    const endpoints = getEndpoints(id, type, videoLanguage);

    return (
        <DataFetcher
            endpoint={endpoints}
            render={({ data, error, isLoading }) => {
                if (isLoading) {
                    return <div>Loading...</div>;
                }

                if (error) {
                    return <div>Error: {error.message}</div>;
                }

                const videos = data?.[0]?.results;
                return videos ? (
                    <VideoContainer data={videos} />
                ) : (
                    <div>No videos available</div>
                );
            }}
        />
    );
};
const VideoContainer = ({ data }) => {
    const [videos, setVideos] = useState(
        data.filter((el) => el.type === "Trailer")
    );

    // returns an array of Strings ['trailers','Clip',...]
    const getUniqueVideoTypes = (data) => {
        return Object.keys(
            data.reduce((acc, cur) => {
                acc[cur.type] = true;
                return acc;
            }, {})
        );
    };

    const filterVideosByType = (type) => {
        const newVideos = data.filter((el) => el.type === type);
        setVideos((prev) => (type ? newVideos : prev));
    };

    const renderVideoContainers = (videos) => {
        return videos.length ? (
            videos.map((video) => (
                <VideoPlayer key={video.key} id={video.key} />
            ))
        ) : (
            <div>No videos of this type available</div>
        );
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 40,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                }}
            >
                <VideoButtons
                    onClick={filterVideosByType}
                    buttons={getUniqueVideoTypes(data)}
                />
            </div>
            <div
                style={{
                    justifyContent: "space-evenly",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: 40,
                    marginBottom: 60,
                }}
            >
                {renderVideoContainers(videos)}
            </div>
        </div>
    );
};
//// // // // // // // //
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
//
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

    // helper functions
    const filterGenres = (movieGenres, allGenres) => {
        return allGenres.filter((el) => movieGenres.includes(el.id));
    };

    let movie = null;
    let movieType = type; // TV_SHOWS, MOVIES, MY_MOVIES

    switch (movieType) {
        case "TV_SHOWS":
            // [movie] = tv_shows.filter((el) => el.id === id);
            movie = tv_shows.find((el) => el.id === id);
            break;
        case "MOVIES":
            movie = movies.find((el) => el.id === id);
            break;
        case "MY_MOVIES":
            movie = movies.find((el) => el.id === id);
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
                    title={movie.title || movie.name}
                    release_date={movie.first_air_date || movie.release_date}
                    genres={movieGenres}
                    overview={movie.overview}
                />
            </div>

            <RenderVideos
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
            <CastAndReviewData movie_id={movie.id} type={movieType} />
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
