import bcrypt from "bcrypt";
import { NextApiResponse } from "next";

import { findUser } from "../../../prisma/queries";
import withSession from "../../../lib/session";
import { NextApiRequestWithSession } from "../../../../types";

export default withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        try {
            const userFound = await findUser({ userName: req.body.username });
            if (userFound) {
                const passwordMatch = await bcrypt.compare(
                    req.body.password,
                    userFound.hashedPassword
                );
                if (passwordMatch) {
                    req.session.set("user", userFound.id);
                    await req.session.save();
                    res.json({ userFound });
                } else {
                    throw "Password or Username incorrect";
                }
            } else {
                throw "User not found";
            }
        } catch (error) {
            console.error("Login Api Error: ", error);
            res.status(400).json({ error });
        }
    }
);
