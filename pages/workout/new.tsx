import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import fetcher from "../../lib/fetcher";
import ExerciseInput from "../../components/forms/ExerciseInput";
import useUser from "../../lib/hooks/useUser";
import { ExerciseObject } from "../../types";
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
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

export default function NewWorkout() {
    const classes = useStyles();
    const { user } = useUser({
        redirectTo: "/login",
        redirectIfFound: false,
    });
    const [date, setDate] = useState<Date>(new Date());

    const [exercises, setExercises] = useState<Array<ExerciseObject>>([
        { name: "", reps: 0, weight: 0 },
    ]);

    const submitNewWorkout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetcher("/api/workout/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date, exercises }),
            });
        } catch (error) {
            console.error("Submit New Workout Error: ", error);
        }
    };

    const handleInputChange = async (
        exerciseObject: ExerciseObject,
        index: number
    ) => {
        const list = [...exercises];
        list[index] = exerciseObject;
        setExercises(list);
    };

    const handleRemoveClick = async (index: number) => {
        const list = [...exercises];
        list.splice(index, 1);
        setExercises(list);
    };

    const handleAddClick = () => {
        setExercises([...exercises, { name: "", reps: 0, weight: 0 }]);
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.page}>
                <Typography component="h1" variant="h5">
                    Create New Workout
                </Typography>
                <form onSubmit={submitNewWorkout} className={classes.form}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            value={date}
                            minDate={new Date()}
                            onChange={(newDate) =>
                                setDate(new Date(newDate) || new Date())
                            }
                            format="dd/MM/yyyy"
                        />
                    </MuiPickersUtilsProvider>
                    {exercises.map((x, i) => {
                        return (
                            <ExerciseInput
                                key={i}
                                index={i}
                                nameInt={x.name}
                                repsInt={x.reps}
                                weightInt={x.weight}
                                handleInputChange={handleInputChange}
                                handleRemoveClick={handleRemoveClick}
                                handleAddClick={handleAddClick}
                                displayAdd={i === exercises.length - 1}
                            />
                        );
                    })}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>{" "}
                </form>
            </div>
        </Container>
    );
}

//TODO: Fix they prisma query. Why does it fail on the workout Date
// TODO: Querying the tracker - workout does not return the exercise
