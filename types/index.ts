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

export type ExerciseInputRefs = {
    exerciseInputRef: MutableRefObject<any>;
    refId: String;
};

export type ExerciseInputProps = ExerciseInputRefs & {
    deleteRef: any;
};

export interface ExerciseObject {
    name: String;
    reps: Number;
    weight: Number;
}
