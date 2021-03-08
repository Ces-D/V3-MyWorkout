import Head from "next/head";

import { ReactNode, FunctionComponent } from "react";

type Props = { children?: ReactNode };

const Container: FunctionComponent = ({ children }: Props) => {
    return (
        <>
            <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
                    crossOrigin="anonymous"
                />
            </Head>
            <div className="container">{children}</div>
        </>
    );
};

export default Container;
