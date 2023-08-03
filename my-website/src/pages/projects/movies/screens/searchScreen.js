import { useState, useCallback, useRef, useContext } from "react";
import DataFetch from "../hooks/useFetch";
import memoizeOne from "memoize-one";
import { genres } from "../components/utils";
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import movieApi from "../movieAPI/index";
import { Context as settingsContext } from "../context/settingsContext";
import { SpinningRow } from "../components/carousel";

// Extracted functional component for rendering search results
const SearchResult = ({ isLoading, searchResults, apiCalled }) => {
    const {
        state: { theme },
    } = useContext(settingsContext);

    const renderResults = () => {
        if (isLoading) {
            return (
                <Text variant="headlineLarge" color={theme.buttonColor}>
                    Loading...
                </Text>
            );
        } else if (!apiCalled) {
            return null;
        } else if (!searchResults.length) {
            return (
                <Text variant="headlineLarge" color={theme.buttonColor}>
                    No results found.
                </Text>
            );
        } else {
            return (
                <div>
                    <Text variant="headlineLarge" color={theme.buttonColor}>
                        Search Results
                    </Text>
                    <ul
                        style={{
                            color: theme.buttonColor,
                        }}
                    >
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                {result.title || result.name} -{" "}
                                {result.release_date}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return <>{renderResults()}</>;
};

// GenreButtons Component
const GenreButtons = ({ genres, selectedGenre, onClick }) => {
    const {
        state: { theme },
    } = useContext(settingsContext);
    return (
        <>
            {genres.map((genre) => (
                <li
                    key={genre.id}
                    onClick={() => onClick(genre)}
                    style={{
                        ...styles.genreButton,
                        color:
                            selectedGenre?.id === genre.id
                                ? theme.buttonColor
                                : "white",
                        borderColor: theme.buttonColor,
                    }}
                >
                    {genre.name}
                </li>
            ))}
        </>
    );
};

const Search = () => {
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
            let endpoint =
                type === "genre"
                    ? `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
                    : `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

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

    console.log("render");
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
                <h2>Genres</h2>
                <ul style={styles.genreList}>
                    <GenreButtons
                        genres={genres} // Pass the genres array as a prop
                        selectedGenre={selectedGenre}
                        onClick={handleGenreSelect}
                    />
                </ul>
            </div>

            {/* Search Results */}
            <SearchResult
                isLoading={isLoading}
                searchResults={searchResults}
                apiCalled={apiCalled}
            />
        </div>
    );
};
// Styles
const styles = {
    resultHeading: { color: "white" },

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
