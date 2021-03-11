export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
) {
    try {
        const response = await fetch(input, init);
        const jsonResponse = await response.json();
        if (response.ok) {
            return jsonResponse;
        }
        console.error("Fetcher Response Not Ok", jsonResponse);
    } catch (error) {
        console.error("Fetcher Error: ", error);
        throw error;
    }
}
