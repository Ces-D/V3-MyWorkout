import React from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Assignment from "@material-ui/icons/Assignment";
import Create from "@material-ui/icons/Create";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";

import fetcher from "../lib/fetcher";
import useUser from "../lib/hooks/useUser";
import PopMenu from "./actions/PopMenu";
// TODO: place the icons on the right of bar

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: "none",
            [theme.breakpoints.up("xs")]: {
                display: "block",
            },
        },
        section: {
            display: "flex",
            alignItems: "flex-end",
        },
    })
);

export default function Header() {
    const classes = useStyles();
    const { user, mutateUser } = useUser({
        redirectTo: undefined,
        redirectIfFound: false,
    });

    const router = useRouter();

    const handleLogout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutateUser(await fetcher("/api/user/logout", { method: "POST" }));
        router.push("/login");
    };

    const loggedInUserPopMenu = {
        icon: <AccountCircle />,
        values: [
            {
                key: 1,
                link: "#profile",
                text: "Profile",
                condition: undefined,
            },
            {
                key: 2,
                link: "/api/user/logout",
                text: "Logout",
                condition: handleLogout,
            },
        ],
    };

    const loggedOutUserPopMenu = {
        icon: <AccountCircle />,
        values: [
            { key: 1, link: "/login", text: "Login" },
            { key: 2, link: "/register", text: "Register" },
        ],
    };

    const createPopMenu = {
        icon: <Create />,
        values: [
            { key: 1, link: "/workout/new", text: "New Workout" },
            { key: 2, link: "#program/new", text: "New Program" },
        ],
    };

    const trackerPopMenu = {
        icon: <Assignment />,
        values: [{ key: 1, link: "/tracker", text: "Tracker" }],
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        Workout Tracker
                    </Typography>
                    <div className={classes.grow}>
                        {user?.isLoggedIn ? (
                            <div>
                                <PopMenu
                                    icon={trackerPopMenu.icon}
                                    values={trackerPopMenu.values}
                                />
                                <PopMenu
                                    icon={createPopMenu.icon}
                                    values={createPopMenu.values}
                                />
                                <PopMenu
                                    icon={loggedInUserPopMenu.icon}
                                    values={loggedInUserPopMenu.values}
                                />
                            </div>
                        ) : (
                            <PopMenu
                                icon={loggedOutUserPopMenu.icon}
                                values={loggedOutUserPopMenu.values}
                            />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
