import { useEffect } from "react";
// import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppProps } from "next/app";

import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <Layout>
            {/* <ThemeProvider theme={theme}></ThemeProvider> */}
            <CssBaseline />
            <Component {...pageProps} />
        </Layout>
    );
}
