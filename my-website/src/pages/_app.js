import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Lato } from "next/font/google";

const lato = Lato({
    weight: "400",
    subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
    return (
        <main className={lato.className}>
            <Component {...pageProps} />
        </main>
    );
}
