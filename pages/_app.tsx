import Container from "../components/Container";

import { AppProps } from "next/app";
import "../globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return;
    <Container>
        <Component {...pageProps} />;
    </Container>;
}

export default MyApp;
