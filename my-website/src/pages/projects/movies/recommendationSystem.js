// helper functions
import { genres } from "./components/utils";

const findGenre = (userGenres) => {
    // usage: findGenre is used to return the Genre Object from the genres array.
    // useful to match the genre.id to the genre.title.
    // returns found genres object {id:0,title:'Adventure'}
    // usage example:
    // const userGenresIds = findGenre(['Adventure','Action']).map((el) => el.id);

    const genreMap = {};
    const filteredGenres = [];

    for (const genre of genres) {
        genreMap[genre.name] = genre;
    }
    for (const userGenre of userGenres) {
        const genre = genreMap[userGenre];
        if (genre) {
            filteredGenres.push(genre);
        }
    }

    return filteredGenres;
};

const movieGenreMerger = (genreArray) => {
    // merge all genre Arrays into one
    const mergeGenres = [].concat(...genreArray);
    // get all Remove duplicate Values
    const uniqueGenres = new Set(mergeGenres);

    return [...uniqueGenres];
};

//
const movieRecommendation = (userGenres, movies) => {
    // movieRecommendation is a content-based filtering algorithm
    // it returns a sorted recommendation list of movies with a score

    // creating set of unique values for userGenres
    const userGenresSet = new Set(userGenres);
    //
    const recommendations = movies.map((movie) => {
        // creating set of unique values for every movie
        const commonGenres = new Set(
            movie.genre_ids.filter((genre) => userGenresSet.has(genre))
        );
        // score determines the number of common genres
        // example: userGenres=['Action','Crime']
        // and currentMovie = ['Crime','Adventure']
        // the currentMovie has a score of 1 do to only having a ONE common genre, 'Crime'
        return {
            score: commonGenres.size,
            title: movie.title,
            genres: movie.genre_ids,
            id: movie.id,
        };
    });

    return recommendations.sort((a, b) => b.score > a.score);
};

const movieRecommendations = (userGenres, A, B) => {
    // helper functions
    const filter = (array, set) => array.filter((el) => set.has(el));

    const map = (array, set) => {
        return array.map((arrElement) => {
            const commonGenres = new Set(filter(arrElement.genre_ids, set));
            return {
                score: commonGenres.size,
                title: arrElement.title ? arrElement.title : arrElement.name,
                genres: arrElement.genre_ids,
                id: arrElement.id,
            };
        });
    };
    //
    const userGenresSet = new Set(userGenres);

    return map(A, userGenresSet)
        .concat(map(B, userGenresSet))
        .sort((a, b) => b.score > a.score);
};

//

export {
    findGenre,
    movieGenreMerger,
    movieRecommendation,
    movieRecommendations,
};
