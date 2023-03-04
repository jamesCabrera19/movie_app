import { useRouter } from "next/router";

const Movie = () => {
    const router = useRouter();
    const id = router.query.moviePage;

    return (
        <div style={{ marginTop: 100 }}>
            <h1>Movie Page: {id} </h1>
            <button onClick={() => console.log(id)}>Info</button>
        </div>
    );
};

export default Movie;
