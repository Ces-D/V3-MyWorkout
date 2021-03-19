import bcrypt from "bcrypt";
import { NextApiResponse } from "next";

import { registerNewUser, findUser } from "../../../lib/queries";
import withSession from "../../../lib/session";
import { NextApiRequestWithSession } from "../../../types";

export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const userFound = await findUser({
                userName: req.body.username,
            });
            if (userFound) {
                throw new Error("User already exists");
            }
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await registerNewUser(
                req.body.username,
                req.body.email,
                encryptedPassword,
                req.body.bio
            );
            req.session.set("user", newUser.id);
            await req.session.save();
            res.status(200).json({ newUser });
        } catch (error) {
            console.error("Register Api Error: ", error);
            res.status(400).json({ error });
        }
    }
);
