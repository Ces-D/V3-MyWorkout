import {
    ExerciseObject,
    FindWorkoutQueryParams,
    SearchUserQueryParams,
} from "../../types";
import prisma from "./db";

/**
 * Create new workout in db if it is not going to be a part of a program
 * @param userId the session users Id
 * @param date dateString the workout is meant to be held
 * @param exercises an array containing the various exercises (name, reps, weight)
 * @returns new workout instance
 */
export const createNewWorkout = async (
    userId: number,
    date: string,
    exercises: ExerciseObject[]
) => {
    try {
        const newWorkout = await prisma.workout.create({
            data: {
                writerId: userId,
                Exercise: {
                    create: [...exercises],
                },
                Tracker: {
                    create: {
                        userId: userId,
                        dueDate: date,
                    },
                },
            },
            include: {
                Tracker: true,
                Exercise: true,
            },
        });
        console.log(newWorkout);
        return newWorkout;
    } catch (error) {
        console.error("New Workout Query Error: ", error);
        throw new Error(error);
    }
};

/**
 * Create new user in db
 * @param userName the username
 * @param email email of user
 * @param hashedPassword encrypted password
 * @param bio optional param @defaults to undefined
 * @returns new user instance
 */
export const registerNewUser = async (
    userName: string,
    email: string,
    hashedPassword: string,
    bio?: string
) => {
    try {
        const user = await prisma.user.create({
            data: {
                userName: userName,
                email: email,
                hashedPassword: hashedPassword,
                bio: bio,
            },
        });
        return user;
    } catch (error) {
        console.error("Register New User Query Error: ", error);
        throw new Error(error);
    }
};

/**
 *
 * @param param0
 * @returns
 */
export const findUser = async ({ id, userName }: SearchUserQueryParams) => {
    try {
        let user = undefined;

        if (id && userName) {
            throw new Error("Only one search param allowed");
        } else if (!id && !userName) {
            throw new Error("One search param required");
        }

        if (id) {
            user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
        } else {
            user = await prisma.user.findUnique({
                where: {
                    userName: userName,
                },
            });
        }
        return user;
    } catch (error) {
        console.error("Find User Query Error: ", error);
        throw new Error(error);
    }
};

/**
 * Find a workout from db
 * @param params Object containing due date and user id
 * @returns the workout instance
 */
export const findWorkout = async ({ userId, date }: FindWorkoutQueryParams) => {
    try {
        const workout = await prisma.tracker.findFirst({
            where: {
                userId: userId,

                dueDate: date,
            },
            include: {
                Workout: {
                    include: {
                        Exercise: true,
                    },
                },
            },
        });
        // console.log("Find Workout Response: ", workout);
        return workout;
    } catch (error) {
        console.error("Find Workout Query Error: ", error);
        throw new Error(error);
    }
};
