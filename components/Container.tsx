import Head from "next/head";

import { ReactNode, FunctionComponent } from "react";

type Props = { children?: ReactNode };

const Container: FunctionComponent = ({ children }: Props) => {
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
            {children}
        </>
    );
};

export default Container;
