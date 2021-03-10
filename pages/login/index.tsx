function Login() {
    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    };
    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={loginUser}></form>
        </>
    );
}
// Complete the login pages

export default Login;
