import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState } from "react";

import fetcher from "../../lib/fetcher";
import useUser from "../../lib/hooks/useUser";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        page: {
            marginTop: theme.spacing(9),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

export default function Login() {
    const classes = useStyles();
    const { mutateUser } = useUser({
        redirectTo: "/tracker",
        redirectIfFound: true,
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await mutateUser(
                fetcher("/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                })
            );
        } catch (error) {
            console.error("Login Page Error: ", error);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.page}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={submitLogin} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Forgot Password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                Don't have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

