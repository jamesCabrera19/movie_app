import { useState, useEffect, useRef, useContext } from "react";
import DataFetch from "../hooks/useFetch";
import memoizeOne from "memoize-one";
import { genres } from "../components/utils";
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import movieApi from "../movieAPI/index";
import { Context as settingsContext } from "../context/settingsContext";
import { Context as movieContext } from "../context/movieContext";
import { SpinningRow } from "../components/carousel";

//

const RenderModalCards = ({ results }) => {
    const containerRef = useRef();

    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            {results.map((el) => (
                <TheModal
                    key={el.id}
                    {...el}
                    title={el.title || el.name}
                    poster={el.backdrop_path || el.poster_path}
                    release_date={el.release_date || el.first_air_date}
                    type={"MOVIES"}
                />
            ))}
        </div>
    );
};
// Extracted functional component for rendering search results
const SearchResults = ({ isLoading, searchResults, apiCalled, fontColor }) => {
    const renderResults = () => {
        if (!apiCalled) {
            return null;
        } else if (isLoading) {
            return (
                <Text variant="headlineLarge" color={fontColor}>
                    Loading...
                </Text>
            );
        } else if (!searchResults.length) {
            return (
                <Text variant="headlineLarge" color={fontColor}>
                    No results found.
                </Text>
            );
        } else {
            return (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Text variant="headlineLarge" color={fontColor}>
                            Search Results
                        </Text>
                    </div>
                    <RenderModalCards results={searchResults} />
                </>
            );
        }
    };

    return <>{renderResults()}</>;
};

// GenreButtons Component
const GenreButtons = ({ selectedGenre, onClick, selectedColor }) => {
    const handleSelected = (genreId) => {
        const selectColor =
            genreId === selectedGenre?.id ? "white" : selectedColor;

        return {
            ...styles.genreButton,
            color: selectColor,
            border: `2px solid ${selectColor}`,
        };
    };

    return (
        <>
            {genres.map((genre) => (
                <li
                    key={genre.id}
                    onClick={() => onClick(genre)}
                    style={handleSelected(genre.id)}
                >
                    {genre.name}
                </li>
            ))}
        </>
    );
};

const Search = () => {
    const {
        state: { theme },
    } = useContext(settingsContext);

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiCalled, setApiCalled] = useState(false); // New state variable
    // useRef to get values from form
    const inputRef = useRef();

    const handleGenreSelect = (genre) => {
        if (inputRef.current.value) {
            inputRef.current.value = "";
        }
        setSelectedGenre(genre);
        fetchMovies(genre.id, "genre");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // input value
        const value = inputRef.current.value;
        if (value === "") return;
        if (selectedGenre) setSelectedGenre(null);
        // making api call
        fetchMovies(value, "search");
        // resetting ref
        inputRef.current.value = "";
    };

    const fetchMovies = async (query, type) => {
        setIsLoading(true);
        try {
            // endpoint is for movies only
            let endpoint = `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
            // Perform API request to fetch movies
            const response = await movieApi.get(endpoint);
            const data = response.data.results;
            setSearchResults(data || []);
            setIsLoading(false);
            setApiCalled(true);
        } catch (error) {
            console.error(`Error fetching ${type} results:`, error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Search Bar */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search for movies or TV shows..."
                />
                <button type="submit">Search</button>
            </form>

            {/* Genres Dropdown */}
            <div>
                <Text variant="headlineMedium" color={theme.fontColor}>
                    Genres
                </Text>
                <ul style={styles.genreList}>
                    <GenreButtons
                        selectedGenre={selectedGenre}
                        onClick={handleGenreSelect}
                        selectedColor={theme.fontColor}
                    />
                </ul>
            </div>

            {/* Search Results */}
            <SearchResults
                isLoading={isLoading}
                searchResults={searchResults}
                apiCalled={apiCalled}
                fontColor={theme.buttonColor}
            />
        </div>
    );
};
// Styles
const styles = {
    genreList: {
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        alignItems: "center",
        overflowX: "scroll",
        flexWrap: "wrap",
    },
    genreButton: {
        margin: 5,
        padding: 10,
        width: 120,
        borderRadius: 10,
        border: "1px solid white",
        cursor: "pointer",
    },
};

export default Search;
