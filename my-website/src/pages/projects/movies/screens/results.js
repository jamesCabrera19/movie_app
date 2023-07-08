import React from "react";
// context
import { withMovieContext } from "../components/withMovieContext";
// helper functions
import { MovieRecommendation } from "../components/movieRecommendation";
// components
import { TheModal } from "../components/modal";
import { Text } from "../components/text";
import { LinkedList } from "../components/codeChallenges";
//
const LibraryContent = ({ movies, selectedGenre, type }) => {
    const linked = new LinkedList(1);
    linked.append(3);

    // linked.printList();
    console.log(linked);

    return (
        <>
            <div style={{ marginTop: -50 }}>
                <Text variant="headlineMedium">{selectedGenre}</Text>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {movies.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={type === "TV_SHOWS" ? el.name : el.title}
                        overview={el.overview}
                        release_date={
                            type === "TV_SHOWS"
                                ? el.first_air_date
                                : el.release_date
                        }
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        type={type}
                    />
                ))}
            </div>

            <MovieRecommendation movies={movies} type={type} />
        </>
    );
};

const MoviesWithProps = withMovieContext(LibraryContent);

function MyResults() {
    return <MoviesWithProps additionalProp={null} />;
}

export default MyResults;
