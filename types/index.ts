import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export interface NextApiRequestWithSession extends NextApiRequest {
    session: Session;
}

export type HandlerWithSession = (
    req: NextApiRequestWithSession,
    res: NextApiResponse
) => Promise<any>;
