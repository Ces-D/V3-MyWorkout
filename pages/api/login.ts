import bcrypt from "bcrypt";
import prisma from "../../lib/db";
import withSession from "../../lib/session";
import { HandlerWithSession } from "../../types";

export default withSession(async (req, res) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            userName: req.body?.userName,
        },
    });
    if (existingUser) {
        const passwordMatch = bcrypt.compare(
            req.body?.password,
            existingUser.hashedPassword
        );
        if (passwordMatch) {
            // return all except password
            const user = {
                id: existingUser.id,
                userName: existingUser.userName,
                email: existingUser.email,
                bio: existingUser.bio || "",
            };
            req.session.set("user", user);
            await req.session.save();
            res.status(200).json(existingUser);
        }
    }
});
