import { MutableRefObject } from "react";
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

export type ExerciseInputRefObject = {
    exerciseInputRef: MutableRefObject<any>;
    refId: String;
};

export type ExerciseInputProps = ExerciseInputRefObject & {
    deleteRef: any;
};

export interface ExerciseObject {
    name: string;
    reps: number;
    weight: number;
}

export type ExerciseInputControllerProps = {
    addButtonClick: any;
    clearButtonClick: any;
};
