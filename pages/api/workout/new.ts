import { NextApiResponse } from "next";

import withSession from "../../../lib/session";
import prisma from "../../../lib/db";
import { NextApiRequestWithSession } from "../../../types";

/**
 * Called for independent Workouts aka Workouts not part of Programs
 */
export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const sessionUserId = req.session.get("user");
            if (sessionUserId) {
                // TODO: exercises should be an array of objects || consider making req.body type
                // TODO: test
                const { date, exercises } = req.body;
                const workout = await prisma.workout.create({
                    data: {
                        authorId: sessionUserId,
                        date: date,
                        exercises: {
                            create: [...exercises],
                        },
                    },
                });
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
