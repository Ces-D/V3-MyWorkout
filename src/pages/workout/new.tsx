import React, { useState } from "react";
import {useRouter} from "next/router"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { convertDateToString } from "../../lib/formatDate";
import fetcher from "../../lib/fetcher";
import ExerciseInput from "../../components/forms/ExerciseInput";
import useUser from "../../lib/hooks/useUser";
import { ExerciseObject } from "../../../types";

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
    const {} = useUser({
        redirectTo: "/login",
        redirectIfFound: false,
    });
    const router = useRouter()
    const [chosenDate, setChosenDate] = useState(new Date());

    const [exercises, setExercises] = useState<ExerciseObject[]>([
        { name: "", reps: 0, sets: 0, weight: 0 },
    ]);

    const submitNewWorkout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const date = convertDateToString(chosenDate);
            await fetcher("/api/workout/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date, exercises }),
            });
            router.push("/tracker")
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
        setExercises([...exercises, { name: "", reps: 0, sets: 0, weight: 0 }]);
    };

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.page}>
                <Typography component="h1" variant="h5">
                    Create New Workout
                </Typography>
                <form onSubmit={submitNewWorkout} className={classes.form}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            value={chosenDate}
                            minDate={new Date()}
                            onChange={(newDate) => setChosenDate(newDate)}
                        />
                    </MuiPickersUtilsProvider>
                    {exercises.map((x, i) => {
                        return (
                            <ExerciseInput
                                key={i}
                                index={i}
                                nameInit={x.name}
                                repsInit={x.reps}
                                setsInit={x.sets}
                                weightInit={x.weight}
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
