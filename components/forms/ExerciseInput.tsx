import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";

import { ExerciseInputProps } from "../../types";

export default function ExerciseInput({
    index,
    nameInit,
    repsInit,
    setsInit,
    weightInit,
    handleInputChange,
    handleRemoveClick,
    handleAddClick,
    displayAdd,
}: ExerciseInputProps) {
    const [name, setName] = useState<string>(nameInit);
    const [reps, setReps] = useState<number>(repsInit);
    const [sets, setSets] = useState<number>(setsInit);
    const [weight, setWeight] = useState<number>(weightInit);

    useEffect(() => {
        handleInputChange({ name, reps, sets, weight }, index);
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
                    label="Sets"
                    type="number"
                    autoFocus
                    onChange={(e) => setSets(Number(e.target.value))}
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
                {index !== 0 ? (
                    <IconButton
                        color="inherit"
                        onClick={() => handleRemoveClick(index)}
                    >
                        <Delete />
                    </IconButton>
                ) : (
                    ""
                )}
                {displayAdd ? (
                    <IconButton color="inherit" onClick={handleAddClick}>
                        <Add />
                    </IconButton>
                ) : (
                    ""
                )}
            </Grid>
        </Grid>
    );
}
