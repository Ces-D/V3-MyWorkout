import { withIronSession } from "next-iron-session";
import { HandlerWithSession } from "../types";

export default function withSession(handler: HandlerWithSession) {
    return withIronSession(handler, {
        password: process.env.SESSION_PASSWORD || "secret",
        cookieName: "ironCookie",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        },
    });
}
