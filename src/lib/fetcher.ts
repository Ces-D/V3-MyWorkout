import fetch from "isomorphic-unfetch";

export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const response = await fetch(input, init);
    const jsonResponse = await response.json();
    return jsonResponse;
}
