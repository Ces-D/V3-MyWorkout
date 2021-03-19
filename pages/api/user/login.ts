import bcrypt from "bcrypt";
import { NextApiResponse } from "next";

import { findUser } from "../../../lib/queries";
import withSession from "../../../lib/session";
import { NextApiRequestWithSession } from "../../../types";

export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const userFound = await findUser({ userName: req.body.username });
            if (userFound) {
                const passwordMatch = bcrypt.compare(
                    req.body.password,
                    userFound.hashedPassword
                );
                if (passwordMatch) {
                    // return users id in a cookie
                    req.session.set("user", userFound.id);
                    await req.session.save();
                    res.status(200).json({ userFound });
                }
                throw new Error("Password or Username incorrect");
            }
            throw new Error("User not found");
        } catch (error) {
            console.error("Login Api Error: ", error);
            res.status(400).json({ error });
        }
    }
);
