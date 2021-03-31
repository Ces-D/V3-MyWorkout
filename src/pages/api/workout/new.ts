import { NextApiResponse } from "next";

import withSession from "../../../lib/session";
import { createNewWorkout } from "../../../prisma/queries";
import { NextApiRequestWithSession } from "../../../../types";

/**
 * Called for independent Workouts aka Workouts not part of Programs
 */
export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const sessionUserId = req.session.get("user");
            if (sessionUserId) {
                const workout = await createNewWorkout(
                    sessionUserId,
                    req.body.date,
                    req.body.exercises
                );
                res.status(200).json({ workout });
            } else {
                throw "No Session";
            }
        } catch (error) {
            console.error("API Workout New Error: ", error);
            res.status(400).json({ error });
        }
    }
);
