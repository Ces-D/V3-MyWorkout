import { ExerciseObject } from "../types";
import prisma from "./db";

/**
 * Create new workout if it is not going to be a part of a program
 * @param authorId : the session users Id
 * @param date : date the workout is meant to be held
 * @param exercises : an array containing the various exercises (name, reps, weight)
 * @returns : new workout instance
 */
export const createNewWorkout = async (
    authorId: number,
    date: Date,
    exercises: Array<ExerciseObject>
) => {
    try {
        const newWorkout = await prisma.workout.create({
            data: {
                authorId: authorId,
                date: date,
                exercises: {
                    create: [...exercises],
                },
            },
        });
        return newWorkout;
    } catch (error) {
        console.error("New Workout Body Query: ", error);
        throw new Error(error);
    }
};
