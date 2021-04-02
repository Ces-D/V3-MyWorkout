import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { ExerciseModel } from "../../../types/models";

type ExerciseDisplayProps = {
    exercises: ExerciseModel[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "flex-start",
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        content: {
            paddingLeft: theme.spacing(2),
            paddingBottom: theme.spacing(1),
        },
    })
);

export default function WorkoutDisplay({ exercises }: ExerciseDisplayProps) {
    const classes = useStyles();
    console.log("Exercises: ", exercises);

    return (
        <div className={classes.root}>
            {exercises.map((exercise) => (
                <Card key={exercise.id} >
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {exercise.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Reps: {exercise.reps}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Sets: {exercise.sets}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Weight: {exercise.weight} lbs
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
}
