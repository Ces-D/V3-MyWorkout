import Router from "next/router";
import useSWR from "swr";

export default function useUser({
    redirectTo = false,
    redirectIfFound = false,
} = {}) {
    const { data: user, mutate: mutateUser } = useSWR("/api/user");
    // TODO: finish this logic
    // TODO: Figure out exactly how SWR works
}
