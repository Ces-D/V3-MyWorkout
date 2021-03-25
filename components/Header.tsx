import React from "react";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Assignment from "@material-ui/icons/Assignment";
import Toolbar from "@material-ui/core/Toolbar";

import UserIconButton from "./UserIconButton";
import useUser from "../lib/hooks/useUser";
// TODO: place the icons on the right of bar

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
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
    const { user } = useUser({ redirectTo: undefined, redirectIfFound: false });
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        Workout Tracker
                    </Typography>
                    {/* <div className={classes.grow}> */}
                    <div className={classes.section}>
                        {user?.isLoggedIn && (
                            <IconButton color="inherit">
                                <Link href="/tracker">
                                    <Assignment />
                                </Link>
                            </IconButton>
                        )}
                        <UserIconButton />
                    </div>
                    {/* </div> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
