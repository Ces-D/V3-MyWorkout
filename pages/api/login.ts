import bcrypt from "bcrypt";
import prisma from "../../lib/db";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
    try {
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
                // return users id in a cookie
                const userId = existingUser.id;
                req.session.set("user", userId);
                await req.session.save();
                res.status(200).json(existingUser);
            }
            throw new Error("Password or Username incorrect");
        }
        throw new Error("User not found");
    } catch (error) {
        res.status(400).json({ error });
    }
});
