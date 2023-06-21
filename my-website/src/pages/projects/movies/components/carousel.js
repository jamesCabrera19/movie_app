import { useContext } from "react";
import { Context as MovieContext } from "../context/movieContext";
import Image from "next/image";
import { ImageLoader } from "../components/utils";

// styles
import _styles from "../../../../styles/carousel.module.css";

export const SpinningRow = () => {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const NUMBER_OF_IMAGES = 18;

    const images = movies.slice(0, NUMBER_OF_IMAGES).map((el) => (
        <div className={_styles.slide} key={el.id}>
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={el.poster_path}
                height={100}
                width={70}
                style={{
                    borderRadius: 10,
                    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    margin: "0 5px",
                }}
            />
        </div>
    ));

    return (
        <div
            style={{
                marginTop: -100,
                marginBottom: 50,
            }}
        >
            <div className={_styles.slider}>
                <div className={_styles.slideTrack}>
                    {images}
                    {images}
                </div>
            </div>
        </div>
    );
};
