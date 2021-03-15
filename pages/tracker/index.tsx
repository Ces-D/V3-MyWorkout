import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GetServerSideProps } from "next";
import withSession from "../../lib/session";

import prisma from "../../lib/db";
import { GetServerSidePropsContextWithSession } from "../../types";

//TODO: https://medium.com/@binyamin/static-server-side-and-client-side-rendering-with-nextjs-d5e1c61b24bd

//TODO: write the TrackerSwitcher
// TODO: write the ExerciseAccordion

// TODO: write the Tracker display

// Route: /tracker || /tracker?d=Date
const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function Tracker({ day }: any) {
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

                {JSON.stringify(day)}
                {/* <TrackerSwitcher /> */}
                {/* data.map=(ex) => <ExerciseAccordion ex = ex/> */}
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSession(
    async ({ req, res }: GetServerSidePropsContextWithSession) => {
        // TODO: Test the response
        const user = req.session && req.session.get("user");
        if (!user) {
            res.setHeader("location", "/login");
            res.statusCode = 302;
            res.end();
            return { props: {} };
        }
        // TODO: write the query search conditional requests {d: "tomorrow"} = req.query
        try {
            const activeSubscription = await prisma.subscription.findFirst({
                where: {
                    subscriberId: user,
                    active: true,
                },
            });

            let workout;

            if (activeSubscription) {
                // Get that days workout from the program
                /**
                 * Should return the workout where the programId is equal to the Users active program
                 *  and the position is equal to the subscriptions active program position
                 */
                workout = prisma.workout.findFirst({
                    where: {
                        programId: activeSubscription.programId,
                        programPosition: activeSubscription.workoutPosition,
                    },
                });
            } else {
                // Get that days workout
                /**
                 * Should return the workout where the date is todays date and author is user
                 */
                workout = prisma.workout.findFirst({
                    where: {
                        authorId: user,
                        date: new Date().toISOString(),
                    },
                });
            }
            return { props: { day: workout } };
        } catch (error) {
            console.error("Server Side Day Error: ", error);
            return { props: { day: {} } };
        }
    }
);
