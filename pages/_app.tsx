import { useEffect } from "react";
// import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            {/* <ThemeProvider theme={theme}></ThemeProvider> */}
            <CssBaseline />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
