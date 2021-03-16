import React from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
    children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <Header />
            {children}
        </>
    );
}
