import React, { useState } from "react";
import { useRouter } from "next/router";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useUser from "../lib/hooks/useUser";
import fetcher from "../lib/fetcher";

export default function UserIconButton() {
    const { user, mutateUser } = useUser({
        redirectTo: undefined,
        redirectIfFound: false,
    });
    const router = useRouter();

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(
        null
    );

    const isMenuOpen = Boolean(anchorElement);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorElement(null);
    };

    const handleLogout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        mutateUser(await fetcher("/api/user/logout", { method: "POST" }));
        router.push("/login");
    };

    const userMenu = (
        <Menu
            anchorEl={anchorElement}
            id="primary-user-menu"
            keepMounted
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user?.isLoggedIn ? (
                <div>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="#profile">Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/api/user/logout" onClick={handleLogout}>
                            Logout
                        </Link>
                    </MenuItem>
                </div>
            ) : (
                <div>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/login">Login</Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/register">Register</Link>
                    </MenuItem>
                </div>
            )}
        </Menu>
    );

    return (
        <>
            <IconButton
                edge="end"
                aria-controls="primary-user-menu"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            {userMenu}
        </>
    );
}
