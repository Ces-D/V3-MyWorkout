import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GetServerSideProps } from "next";
import withSession from "../../lib/session";

import { findWorkout } from "../../lib/queries";
import { GetServerSidePropsContextWithSession } from "../../types";

// Route: /tracker || /tracker?d=Date
// const classes = makeStyles((theme: Theme) => createStyles({}));

export default function Tracker({ workout }: any) {
    // const classes = useStyles();
    return (
        <>
            <Head>
                <title>Tracker</title>
            </Head>
            <Container component="main" maxWidth="lg">
                <Typography component="h1" variant="h5">
                    Tracker
                </Typography>

                {JSON.stringify(workout)}
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSession(
    async (context: GetServerSidePropsContextWithSession) => {
        const user = context.req.session && context.req.session.get("user");
        if (!user) {
            context.res.setHeader("location", "/login");
            context.res.statusCode = 302;
            context.res.end();
            return { props: {} };
        }
        //TODO:  req.query = {d: "12/21/21"}
        try {
            const date = new Date()
            console.log("Date: ", date);
            const workout = await findWorkout({
                userId: user,
                date: date,
            });
            console.log("Workout: ", workout);
            return { props: { workout } };
        } catch (error) {
            console.error("Server Side Day Error: ", error);
            return { props: { workout: {} } };
        }
    }
);
