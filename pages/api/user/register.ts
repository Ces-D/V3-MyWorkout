import bcrypt from "bcrypt";
import prisma from "../../../lib/db";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                userName: req.body.username,
            },
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const encryptedPassword = bcrypt.genSaltSync(10, req.body.password);
        const newUser = await prisma.user.create({
            data: {
                userName: req.body.username,
                email: req.body.email,
                hashedPassword: encryptedPassword,
                bio: req.body.bio || undefined,
            },
        });
        const newUserId = newUser.id;
        req.session.set("user", newUserId);
        await req.session.save();
        res.status(200).json({ newUser });
    } catch (error) {
        console.error("Register Api Error: ", error);
        res.status(400).json({ error });
    }
});
