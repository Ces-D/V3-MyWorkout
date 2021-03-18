import React, { createRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";

import DateFnsUtils from "@date-io/date-fns";
import MuiPickerUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import { KeyboardDatePicker } from "@material-ui/pickers";

import ExerciseInput from "../../components/forms/ExerciseInput";

import useUser from "../../lib/hooks/useUser";
import { ExerciseInputRefs } from "../../types";
import { randomBytes } from "node:crypto";

// TODO: test and possibly clean a little
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
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const exerciseRefs: Array<ExerciseInputRefs> = [];

    const submitNewWorkout = async (e: React.SyntheticEvent) => {
        // TODO: complete the submit form logic
    };

    const handleExerciseAddButtonClick = async (e: React.SyntheticEvent) => {
        /**
         *  add a ref and id object to exerciseRefs
         * changes to exerciseRefs should add a new ExerciseInput Component
         * placing the ref into the ref param and id into the id param
         */
        const id = randomBytes(10);
        const ref = createRef();
        exerciseRefs.push({
            exerciseInputRef: ref,
            refId: id.toString(),
        });
    };
    const handleExerciseClearButtonClick = (e: React.SyntheticEvent) => {
        console.log("Clear");
    };

    const handleExerciseDelete = (id: String) => {
        /**
         * remove a ref and id object from exerciseRefs Array
         */
        try {
            exerciseRefs.filter((obj) => {
                return obj.refId !== id;
            });
            return;
        } catch (error) {
            console.error("Problem Deleting an Exercise Input");
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.page}>
                <Typography component="h1" variant="h5">
                    Create New Workout
                </Typography>
                <form onSubmit={submitNewWorkout} className={classes.form}>
                    <MuiPickerUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            value={selectedDate}
                            minDate={new Date()}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            format="dd/MM/yyyy"
                        />
                    </MuiPickerUtilsProvider>
                    <Grid>
                        <IconButton
                            color="inherit"
                            onClick={handleExerciseAddButtonClick}
                        >
                            <Add />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={handleExerciseClearButtonClick}
                        >
                            <Clear />
                        </IconButton>
                    </Grid>

                    {exerciseRefs.map((exerciseRefObj) => (
                        <ExerciseInput
                            exerciseInputRef={exerciseRefObj.exerciseInputRef}
                            refId={exerciseRefObj.refId}
                            deleteRef={handleExerciseDelete}
                        />
                    ))}
                </form>
            </div>
        </Container>
    );
}
