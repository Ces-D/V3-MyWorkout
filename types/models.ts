export interface User {
    userName: string;
    email: string;
    hashedPassword: string;
    bio?: string;
}

export interface Program {
    name: string;
    published: Boolean;
    startDate: string;
    writerId: number;
}

export interface Workout {
    done: Boolean;
    programId?: number;
    programOrder?: number;
    writerId?: number;
}

export interface Exercise {
    name: string;
    reps: number;
    sets: number;
    weight: number;
    workoutId: number;
}

export interface Subscription {
    active: Boolean;
    programId: number;
    subscriberId: number;
}

export interface Tracker {
    userId: number;
    dueDate: string;
    workoutId: number;
}

export interface UserModel extends User {
    id: number;
    Tracker: TrackerModel[];
    Program: ProgramModel[];
    Subscription: SubscriptionModel[];
    Workout: WorkoutModel[];
}

export interface ProgramModel extends Program {
    id: number;
    Writer: UserModel[];
    Workout: WorkoutModel[];
    Subscription?: SubscriptionModel[];
}

export interface WorkoutModel extends Workout {
    id: number;
    Program: ProgramModel;
    Writer: UserModel;
    Tracker: TrackerModel[];
    Exercise: ExerciseModel[];
}

export interface ExerciseModel extends Exercise {
    id: number;
    Workout: WorkoutModel;
}

export interface SubscriptionModel extends Subscription {
    id: number;
    Program: ProgramModel;
    Subscriber: UserModel;
}

export interface TrackerModel extends Tracker {
    id: number;
    User: UserModel;
    Workout: WorkoutModel;
}
