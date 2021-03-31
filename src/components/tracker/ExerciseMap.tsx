import { ExerciseModel } from "../../../types/models";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography"

type ExerciseMaps = {
    exercises: ExerciseModel[];
};

export default function ExerciseMap({ exercises }: ExerciseMaps) {
    console.log("Exercise from Map: ", exercises)
    return (
        <div>
            {exercises.map((exercise) => {
                // <Accordion key={exercise.id}>
                //     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                //         <Typography>{exercise.name}</Typography>
                //     </AccordionSummary>
                //     <AccordionDetails>
                //         <Typography>{exercise.reps}</Typography>
                //     </AccordionDetails>
                // </Accordion>;
                <div>{exercise.name}</div>

                // <ExerciseAccordion
                //     key={exercise.id}
                //     id={exercise.id}
                //     name={exercise.name}
                //     reps={exercise.reps}
                //     sets={exercise.sets}
                //     weight={exercise.weight}
                //     workoutId={exercise.workoutId}
                // />;
            })}
        </div>
    );
}

//TODO: FIgure out why this isnt loading the exercises