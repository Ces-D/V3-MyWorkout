import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function ExerciseInput() {
    const [name, setName] = useState<String | null>();
    const [reps, setReps] = useState<Number | null>();
    const [weight, setWeight] = useState<Number | null>();
// TODO: Figure out how to pass state up 
/**
 * Need to pass the name, reps, weight up into the form. 
 * That way we can add or remove exerciseInputs at will
 * 
 */
    return (
        <>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Exercise Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
            />
            
        </>
    );
}
