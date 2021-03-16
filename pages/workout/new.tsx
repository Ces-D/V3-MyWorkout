import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
]
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";

import fetcher from "../../lib/fetcher";
import useUser from "../../lib/hooks/useUser";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        page: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        date: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    })
);

export default function NewWorkout() {
    const classes = useStyles();
    const { mutateUser } = useUser({
        redirectTo: "/login",
        redirectIfFound: false,
    });
    const [date, setDate] = useState(new Date().toISOString());
    const [exercises, setExercises] = useState([]);

    const submitNewWorkout = async (e: React.SyntheticEvent) => {
        // TODO: complete the submit form logic
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.page}>
                <Typography component="h1" variant="h5">
                    Create New Workout
                </Typography>
                <form onSubmit={submitNewWorkout} className={classes.form}>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue={new Date()}
                        className={classes.date}
                        InputLabelProps={{ shrink: true }}
                    />
                </form>
            </div>
        </Container>
    );
}
