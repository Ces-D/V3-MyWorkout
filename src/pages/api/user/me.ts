import { NextApiResponse } from "next";

import { findUser } from "../../../prisma/queries";
import withSession from "../../../lib/session";
import { NextApiRequestWithSession } from "../../../../types";

export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const sessionUserId = await req.session.get("user");
            if (sessionUserId) {
                const userResponse = await findUser({
                    id: sessionUserId,
                });
                if (userResponse) {
                    const user = {
                        id: userResponse.id,
                        userName: userResponse.userName,
                        email: userResponse.email,
                        bio: userResponse.bio || "",
                    };
                    res.status(200).json({ isLoggedIn: true, ...user });
                } else {
                    throw "Problem finding User";
                }
            } else {
                throw "No Session";
            }
        } catch (error) {
            console.error("With Session Error: ", error);
            res.status(200).json({ error });
        }
    }
);
