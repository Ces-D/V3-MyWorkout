import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";

import { ExerciseInputProps } from "../../types";

export default function ExerciseInput(props: ExerciseInputProps) {
    const [name, setName] = useState<string>(props.nameInt);
    const [reps, setReps] = useState<number>(props.repsInt);
    const [weight, setWeight] = useState<number>(props.weightInt);

    useEffect(() => {
        props.handleInputChange({ name, reps, weight }, props.index);
    }, [name, reps, weight]);

    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item sm>
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
                {props.index !== 0 ? (
                    <IconButton
                        color="inherit"
                        onClick={() => props.handleRemoveClick(props.index)}
                    >
                        <Delete />
                    </IconButton>
                ) : (
                    ""
                )}
                {props.displayAdd ? (
                    <IconButton color="inherit" onClick={props.handleAddClick}>
                        <Add />
                    </IconButton>
                ) : (
                    ""
                )}
            </Grid>
        </Grid>
    );
}
