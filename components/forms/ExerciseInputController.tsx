import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";

import { ExerciseInputControllerProps } from "../../types";

export default function ExerciseInputController(
    props: ExerciseInputControllerProps
) {
    return (
        <Grid>
            <IconButton color="inherit" onClick={props.addButtonClick}>
                <Add />
            </IconButton>
            <IconButton color="inherit" onClick={props.clearButtonClick}>
                <Clear />
            </IconButton>
        </Grid>
    );
}
