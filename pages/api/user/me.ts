import withSession from "../../../lib/session";
import prisma from "../../../lib/db";

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
});
