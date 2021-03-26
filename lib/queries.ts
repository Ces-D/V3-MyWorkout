import {
    ExerciseObject,
    FindWorkoutParams,
    SearchUserQueryParams,
} from "../types";
import prisma from "./db";

/**
 * Create new workout in db if it is not going to be a part of a program
 * @param userId the session users Id
 * @param date date the workout is meant to be held
 * @param exercises an array containing the various exercises (name, reps, weight)
 * @returns new workout instance
 */
export const createNewWorkout = async (
    userId: number,
    date: Date,
    exercises: Array<ExerciseObject>
) => {
    try {
        const newWorkout = await prisma.workout.create({
            data: {
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
        });
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
 * Find user from db
 * @param params Object containing either user id or username
 * @returns the user instance
 */
export const findUser = async (params: SearchUserQueryParams) => {
    try {
        let user = undefined;

        if (params.id && params.userName) {
            throw new Error("Only one search param allowed");
        } else if (!params.id && !params.userName) {
            throw new Error("One search param required");
        }

        if (params.id) {
            user = await prisma.user.findUnique({
                where: {
                    id: params.id,
                },
            });
        } else {
            user = await prisma.user.findUnique({
                where: {
                    userName: params.userName,
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
export const findWorkout = async (params: FindWorkoutParams) => {
    try {
        const workout = await prisma.tracker.findFirst({
            where: {
                userId: params.userId,
                dueDate: params.date,
            },
            include: {
                workout: true,
            },
        });
        return workout;
    } catch (error) {
        console.error("Find Workout Query Error: ", error);
        throw new Error(error);
    }
};
