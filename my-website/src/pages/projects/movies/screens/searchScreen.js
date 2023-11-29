import { useState, useRef, useContext } from "react";
import { genres } from "../components/utils";
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import movieApi from "../movieAPI/index";
import { Context as settingsContext } from "../context/settingsContext";

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
            {results.map((el) => {
                // console.log(el);
                return (
                    <TheModal
                        key={el.id}
                        {...el}
                        title={el.title || el.name}
                        poster={el.backdrop_path || el.poster_path}
                        release_date={el.release_date || el.first_air_date}
                        type={"MOVIES"}
                    />
                );
            })}
        </div>
    );
};
// Extracted functional component for rendering search results
const SearchResults = ({ isLoading, searchResults, apiCalled, fontColor }) => {
    const styles = {
        defaultHeight: {
            minHeight: "40vh",
        },
        search: {
            display: "flex",
            justifyContent: "center",
        },
    };
    const renderResults = () => {
        if (!apiCalled) {
            return <div style={styles.defaultHeight} />;
        } else if (isLoading) {
            return (
                <Text variant="headlineLarge" color={fontColor}>
                    Loading...
                </Text>
            );
        } else if (!searchResults.length) {
            return (
                <div style={styles.defaultHeight}>
                    <Text variant="headlineLarge" color={fontColor}>
                        No results found.
                    </Text>
                </div>
            );
        } else {
            return (
                <>
                    <div style={styles.search}>
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
            ...styles,
            color: selectColor,
            border: `2px solid ${selectColor}`,
        };
    };
    const styles = {
        margin: 5,
        padding: 10,
        width: 120,
        borderRadius: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
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
        // checking for value before calling api
        if (value === "") return;
        // disabling selectedGenre state before searching movie title
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

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        form: {
            width: 350,
            borderRadius: 10,
            height: 50,
            display: "flex",
            overflow: "hidden",
        },
        formInput: {
            width: "75%",
            padding: 10,
            border: 0,
            color: theme.fontColor,
        },
        formButton: {
            width: "25%",
            color: theme.fontColor,
            border: "0px solid white",
            backgroundColor: theme.panelBackgroundColor,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderLeftWidth: 0,
        },
        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            listStyle: "none",
            alignItems: "center",
            overflowX: "scroll",
            flexWrap: "wrap",
        },
    };

    return (
        <div style={styles.container}>
            {/* Search Bar */}
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    style={styles.formInput}
                    type="text"
                    ref={inputRef}
                    placeholder="Search for movies or TV shows..."
                />
                <button type="submit" style={styles.formButton}>
                    Search
                </button>
            </form>

            {/* Genres Dropdown */}
            <div>
                <div style={{ marginLeft: 40 }}>
                    <Text variant="headlineMedium" color={theme.fontColor}>
                        Genres
                    </Text>
                </div>

                <ul style={styles.buttonContainer}>
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

export default Search;
