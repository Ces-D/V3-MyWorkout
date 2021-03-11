import withSession from "../../lib/session";
import prisma from "../../lib/db";

export default withSession(async (req, res) => {
    try {
        const sessionUserId = req.session.get("user");
        if (sessionUserId) {
            const userResponse = await prisma.user.findUnique({
                where: {
                    id: sessionUserId,
                },
            });
            if (userResponse) {
                const user = {
                    id: userResponse.id,
                    userName: userResponse.userName,
                    email: userResponse.email,
                    bio: userResponse.bio || "",
                };
                res.status(200).json({ isLoggedIn: true, ...user });
            }
            throw new Error("Problem finding User");
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});
