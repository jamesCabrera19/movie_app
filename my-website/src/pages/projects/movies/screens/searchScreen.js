import { useContext, useMemo, useState } from "react";

import DataFetcher from "../hooks/useFetch";
import memoizeOne from "memoize-one";
import { genres } from "../components/utils";

const endpoint = `/search/movie?query=batman&include_adult=false&language=en-US&page=1`;

const Genres = ({ selectGenre }) => {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {genres.map((el) => (
                <div
                    onClick={() => selectGenre(el)}
                    key={el.id}
                    style={{
                        border: "1px solid red",
                        width: 300,
                        height: 200,
                        margin: 10,
                        borderRadius: 10,
                        color: "white",
                    }}
                >
                    {el.name}
                </div>
            ))}
        </div>
    );
};

const Search = ({}) => {
    const [genre, setGenre] = useState({ genre: "", showGenres: true });

    const handleGenreClick = (newGenre) => {
        setGenre({ genre: newGenre, showGenres: false });
    };

    const handleShowGenres = () => setGenre({ genre: "", showGenres: true });

    return (
        <>
            {genre.showGenres && <Genres selectGenre={handleGenreClick} />}
            {genre.genre && (
                <DataFetcher
                    endpoint={[
                        "one",
                        // `/search/movie?query=${genre}&include_adult=false&language=en-US&page=1`,
                    ]}
                    render={({ data, error, isLoading }) => {
                        console.log(data.length);
                        if (data) {
                            return (
                                <>
                                    <div
                                        style={{
                                            border: "1px solid red",
                                            width: 300,
                                            height: 200,
                                            margin: 10,
                                            borderRadius: 10,
                                            color: "white",
                                        }}
                                        onClick={handleShowGenres}
                                    >
                                        hide genres
                                    </div>
                                </>
                            );
                        }
                    }}
                />
            )}
        </>
    );
};

export default Search;
