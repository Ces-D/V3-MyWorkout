import { Session } from "next-iron-session";
import { NextApiRequest, GetServerSidePropsContext } from "next";
import { IncomingMessage } from "node:http";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

export interface NextApiRequestWithSession extends NextApiRequest {
    session: Session;
}
export interface GetServerSidePropsContextWithSession
    extends GetServerSidePropsContext {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
        session: Session;
    };
}
export type ExerciseInputProps = {
    index: number;
    nameInit: string;
    repsInit: number;
    setsInit: number;
    weightInit: number;
    handleInputChange: any;
    handleRemoveClick: any;
    handleAddClick: any;
    displayAdd: Boolean;
};

export type ExerciseBoxProps = {
    id: number;
    name: string;
    reps: number;
    sets: number;
    weight: number;
};

export type ExerciseObject = {
    name: string;
    reps: number;
    sets: number;
    weight: number;
};

export type SearchUserQueryParams = {
    id?: number;
    userName?: string;
};

export type FindWorkoutQueryParams = {
    userId: number;
    date: string;
};
