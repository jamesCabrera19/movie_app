import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "~video-react/dist/video-react.css";
import { Provider as AuthProvider } from "./projects/movies/context/AuthContext";
// import { Provider as AuthProvider } from "./projects/movies/context/AuthContext";

import { Lato } from "next/font/google";

const lato = Lato({
    weight: "400",
    subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
    return (
        <main className={lato.className}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </main>
    );
}
