import React, { useContext } from "react";
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import ReactPlayer from "react-player";
import useFetchVideoLink from "../hooks/useFetchVideoLink";
import Image from "next/image";
import { ImageLoader } from "../components/utils";
import { Text } from "../components/text";
//
//
const VideoScreen = () => {
    const { state } = useContext(MovieContext);
    const {
        params: { id },
    } = useContext(NavigationContext);
    const [movie] = state.movies.filter((el) => el.id === id);
    //
    const { data, error, isLoading } = useFetchVideoLink(id, "en");

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

    const trailers = data.filter((item) => item.type === "Trailer");
    console.log(trailers);
    console.log(movie.id);
    return (
        <div
            style={{
                color: "red",
                // height: "100%",
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
                    height={400}
                    width={720}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                />
            </div>
            <div style={{ width: 500, margin: "auto" }}>
                <Text>{movie.overview}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {trailers.map((trailer) => (
                    <div
                        key={trailer.id}
                        style={{ borderRadius: 10, overflow: "hidden" }}
                    >
                        <ReactPlayer
                            width={320}
                            height={180}
                            url={`https://www.youtube.com/watch?v=${trailer.key}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoScreen;
