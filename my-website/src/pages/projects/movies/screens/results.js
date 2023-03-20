import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
import { Text } from "../components/text";
import { TheModal } from "../components/modal";

function MyResults() {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const {
        params: { ids, genre },
    } = useContext(NavigationContext);

    return (
        <div style={{ height: "100vh" }}>
            <div style={{ marginLeft: 100 }}>
                <Text variant="headlineMedium">{genre} Movies</Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "50px 100px 0 100px",
                }}
            >
                {movies
                    .filter((el) => ids.includes(el.id))
                    .map((el) => (
                        <TheModal
                            key={el.id}
                            poster={el.backdrop_path}
                            title={el.title}
                            overview={el.overview}
                            release_date={el.release_date}
                            vote_average={el.vote_average}
                            original_language={el.original_language}
                            addButtonOptions={false}
                        />
                    ))}
            </div>
        </div>
    );
}

export default MyResults;
