import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";

import { ExerciseInputProps } from "../../types";

export default function ExerciseInput(props: ExerciseInputProps) {
    const [name, setName] = useState<String>("");
    const [reps, setReps] = useState<Number>(0);
    const [weight, setWeight] = useState<Number>(0);

    useEffect(() => {
        props.exerciseInputRef.current = {
            name: name,
            reps: reps,
            weight: weight,
        };
    }, [name, reps, weight]);

    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item xs>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Exercise"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Reps"
                    type="number"
                    autoFocus
                    onChange={(e) => setReps(Number(e.target.value))}
                />
            </Grid>
            <Grid item xs>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Weight (lbs)"
                    type="number"
                    autoFocus
                    onChange={(e) => setWeight(Number(e.target.value))}
                />
            </Grid>
            <Grid item xs>
                <IconButton
                    color="inherit"
                    onClick={props.deleteRef(props.exerciseInputRef)}
                >
                    <Delete />
                </IconButton>
            </Grid>
        </Grid>
    );
}
