import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GetServerSideProps } from "next";
import withSession from "../../lib/session";

import prisma from "../../lib/db";

type day = {
    any: any;
    error: any;
};

//TODO: https://medium.com/@binyamin/static-server-side-and-client-side-rendering-with-nextjs-d5e1c61b24bd

//TODO: write the TrackerSwitcher
// TODO: write the ExerciseAccordion

// TODO: write the Tracker display
// TODO: write the Tracker request logic

// Route: /tracker || /tracker?d=Date
const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function Tracker(day: day) {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>Tracker</title>
            </Head>
            <Container component="main" maxWidth="lg">
                <Typography component="h1" variant="h5">
                    Tracker
                </Typography>
                {/* <TrackerSwitcher /> */}
                {/* data.map=(ex) => <ExerciseAccordion ex = ex/> */}
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSession(
    async (req, res) => {
        try {
            const user = req.session.get("user");
            if (!user) {
                // check if user logged In
                res.setHeader("location", "/login");
                res.statusCode = 302;
                res.end();
            }
            // TODO: Get the query if there is one for the day else get todays
            // or load the users workouts for two weeks and display as accordion on
            // click they are sent to the workouts page
            /**
             * Call the workout on the client side aka api request
             * Need: dynamic api route,
             * Pro: cache the similar html
             * Con: two requests
             *
             * or
             *
             * use ServerSideProps which would be a fixed cost
             * which could later be cached by nginx *potentially
             * DECIDED WE WILL DO SERVER SIDE RENDERING FOR THIS PORTION
             */
            const workout = prisma.workout.findFirst({});
            // TODO: write logic for finding the days workout
        } catch (error) {
            console.error("Server Side Day Error: ", error);
        }
        return { props: {} };
    }
);
