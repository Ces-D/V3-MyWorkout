import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import fetcher from "../fetcher";

//https://swr.vercel.app/docs/mutation

interface UserHookParams {
    redirectTo: string | undefined;
    redirectIfFound: Boolean;
}

export default function useUser({
    redirectTo,
    redirectIfFound = false,
}: UserHookParams) {
    const { data: user, error: userError, mutate: mutateUser } = useSWR(
        "api/user/me",
        fetcher
    );

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);
    return { user, userError, mutateUser };
}

// export interface SWRResponse<Data, Error> {
//     data?: Data;
//     error?: Error;
//     revalidate: () => Promise<boolean>;
//     mutate: (data?: Data | Promise<Data> | MutatorCallback<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
//     isValidating: boolean;
// }
