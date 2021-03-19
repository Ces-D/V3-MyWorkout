import React, { createRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import MuiPickerUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import { KeyboardDatePicker } from "@material-ui/pickers";

import fetcher from "../../lib/fetcher";
import ExerciseInput from "../../components/forms/ExerciseInput";
import ExerciseInputController from "../../components/forms/ExerciseInputController";
import useUser from "../../lib/hooks/useUser";
import { ExerciseInputRefObject } from "../../types";
import { randomBytes } from "node:crypto";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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
    const [selectedDate, setSelectedDate] = useState<
        Date | MaterialUiPickersDate
    >(new Date());
    let exerciseRefs: Array<ExerciseInputRefObject> = [];

    const submitNewWorkout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            // Get just the current exercises
            const exercises = exerciseRefs.filter((obj) => {
                obj.exerciseInputRef.current;
            });
            await mutateUser(
                fetcher("api/workout/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ selectedDate, exercises }),
                })
            );
        } catch (error) {}
    };

    const handleExerciseAddButtonClick = async () => {
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
    const handleExerciseClearButtonClick = () => {
        exerciseRefs = [];
    };

    const handleExerciseDelete = (id: String) => {
        /** Remove a ref Object given the objects refId property
         * @param {String} id is the refId
         */
        try {
            const objectIndex = exerciseRefs
                .map((obj) => {
                    return obj.refId;
                })
                .indexOf(id);
            exerciseRefs.splice(objectIndex, 1);
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

                    <ExerciseInputController
                        addButtonClick={handleExerciseAddButtonClick}
                        clearButtonClick={handleExerciseClearButtonClick}
                    />

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
