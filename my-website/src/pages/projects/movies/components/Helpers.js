class MovieOrganizer {
    constructor(movies, genres, onlyIDs) {
        this.movies = movies;
        this.genres = genres;
        this.onlyIDs = onlyIDs;
    }
    getIds(arr = []) {
        return arr.map((el) => el.id);
    }
    getNames() {
        return this.genres.map((el) => el.name);
    }
    filterMovies(target = Number) {
        if (this.onlyIDs) {
            return this.getIds(
                this.movies.filter(({ genre_ids }) =>
                    genre_ids.includes(target)
                )
            );
        }
        return this.movies.filter(({ genre_ids }) =>
            genre_ids.includes(target)
        );
    }
    genresMap() {
        return this.genres.map(({ id }) => this.filterMovies(id));
    }
    moviesByGenre() {
        const names = this.getNames(this.genres);
        const obj = {};
        const m = this.genresMap(this.genres, this.movies); //[[]]
        for (let i = 0; i < m.length; i++) {
            const element = m[i];
            const currentKey = names[i];
            obj[currentKey] = element;
        }
        return obj;
    }
}

export { MovieOrganizer };
