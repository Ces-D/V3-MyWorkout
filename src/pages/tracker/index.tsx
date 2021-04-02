import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";

import withSession from "../../lib/session";
import { convertDateToString } from "../../lib/formatDate";
import { findWorkout } from "../../prisma/queries";
import WorkoutDisplay from "../../components/tracker/WorkoutDisplay";
import { GetServerSidePropsContextWithSession } from "../../../types";
import { TrackerModel } from "../../../types/models";

interface TrackerProps {
    workout: TrackerModel;
}

export default function Tracker({ workout }: TrackerProps) {
    const workoutFound = (w: TrackerModel): Boolean => {
        if (w !== null) {
            return true;
        }
        return false;
    };

    const workoutNotFoundDisplay = (
        <Typography>
            No Workout For Today. Would you like to make one
        </Typography>
    );

    return (
        <>
            <Head>
                <title>Tracker</title>
            </Head>
            <Container component="main" maxWidth="lg">
                <Typography component="h1" variant="h5">
                    {new Date().toDateString()}
                </Typography>
                {workoutFound(workout) ? (
                    <WorkoutDisplay exercises={workout.Workout.Exercise} />
                ) : (
                    workoutNotFoundDisplay
                )}
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
            const date = convertDateToString(new Date());
            const workout = await findWorkout({
                userId: user,
                date: date,
            });
            return { props: { workout: workout } };
        } catch (error) {
            console.error("Server Side Day Error: ", error);
            return { props: { workout: {} } };
        }
    }
);
