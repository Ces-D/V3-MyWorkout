import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { ExerciseBoxProps } from "../../types";

export default function ExerciseAccordion(props: ExerciseBoxProps) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            ></AccordionSummary>
        </Accordion>
    );
}

//TODO: Finish the Accordion