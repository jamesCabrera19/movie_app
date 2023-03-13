import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
import { Text } from "../components/text";
import MyCard from "../components/myCard";
import { TheModal } from "../components/modal";

function MyResults() {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const {
        params: { ids, genre },
    } = useContext(NavigationContext);

    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginLeft: 10 }}>
                <Text>{genre} Movies</Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {movies
                    .filter((el) => ids.includes(el.id))
                    .map((el) => (
                        <TheModal item={el}>
                            <MyCard
                                poster={el.backdrop_path}
                                movieID={el.id}
                                sizePercent={-0.0}
                                buttonPosition={null}
                            />
                        </TheModal>
                    ))}
            </div>
        </div>
    );
}

export default MyResults;
