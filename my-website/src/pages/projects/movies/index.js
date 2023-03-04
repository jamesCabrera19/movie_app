import { useRouter } from "next/router";
import Link from "next/link";
//
import MoviesApp from "./app";

function Movies() {
    const router = useRouter();

    return (
        <>
            <MoviesApp />
        </>
    );
}
export default Movies;
