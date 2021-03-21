import { NextApiResponse } from "next";

import withSession from "../../../lib/session";
import { NextApiRequestWithSession } from "../../../types";

export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            req.session.destroy();
            res.status(200).json({ data: "Logged Out" });
        } catch (error) {
            console.error("Logout Api Error: ", error);
            res.status(400).json({ error });
        }
    }
);
