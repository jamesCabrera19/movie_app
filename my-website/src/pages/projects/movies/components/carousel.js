import { useContext } from "react";
// context
import { Context as MovieContext } from "../context/movieContext";
// components
import Image from "next/image";
// helper functions
import { ImageLoader } from "../components/utils";
// styles
import _styles from "../../../../styles/carousel.module.css";

export const SpinningRow = () => {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const NUMBER_OF_IMAGES = 18;
    const styles = {
        container: {
            marginTop: -100,
            marginBottom: 50,
        },
        img: {
            borderRadius: 10,
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
            margin: "0 5px",
        },
    };

    const images = movies.slice(0, NUMBER_OF_IMAGES).map((el) => (
        <div className={_styles.slide} key={el.id}>
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={el.poster_path}
                height={100}
                width={70}
                style={styles.img}
            />
        </div>
    ));

    return (
        <div style={styles.container}>
            <div className={_styles.slider}>
                <div className={_styles.slideTrack}>
                    {images}
                    {images}
                </div>
            </div>
        </div>
    );
};
