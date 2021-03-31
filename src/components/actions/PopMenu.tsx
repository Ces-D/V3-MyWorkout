import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";

interface MenuProps {
    icon: any;
    values: MenuValues[];
}

type MenuValues = {
    key: number;
    link: string;
    text: string;
    condition?: (e: React.SyntheticEvent) => Promise<void>;
};

export default function PopMenu({ icon, values }: MenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menu = (
        <Menu
            keepMounted
            anchorEl={anchorEl}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {values.map((value) => {
                return (
                    <MenuItem key={value.key} onClick={handleClose}>
                        <Link href={value.link} onClick={value.condition}>
                            {value.text}
                        </Link>
                    </MenuItem>
                );
            })}
        </Menu>
    );

    return (
        <>
            <IconButton edge="end" onClick={handleOpen} color="inherit">
                {icon}
            </IconButton>
            {menu}
        </>
    );
}
