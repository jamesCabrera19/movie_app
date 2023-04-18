import { Lato } from "next/font/google";

const lato = Lato({
    weight: "300",
    style: "normal",
    subsets: ["latin"],
});

const latoBold = Lato({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});
const font = {
    normal: lato.className,
    bold: latoBold.className,
};

const Text = ({ variant, color, children }) => {
    const Lato = font.bold;
    const LatoNormal = font.normal;

    const styles = {
        color: color ? color : "red",
        lineHeight: 1.6,
        wordBreak: "break-word",
    };
    switch (variant) {
        case "headlineLarge":
            return (
                <h1 style={styles} className={Lato}>
                    {children}
                </h1>
            );
        case "headlineMedium":
            return (
                <h2 style={styles} className={Lato}>
                    {children}
                </h2>
            );
        case "headlineSmall":
            return (
                <h3 style={styles} className={Lato}>
                    {children}
                </h3>
            );

        case "headlineExtraSmall":
            return (
                <h5 style={styles} className={Lato}>
                    {children}
                </h5>
            );

        default:
            return (
                <p style={{ ...styles, fontSize: 18 }} className={latoBold}>
                    {children}
                </p>
            );
    }
};

export { Text };
