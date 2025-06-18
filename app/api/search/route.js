export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return new Response(
            JSON.stringify({ error: "Query parameter 'q' is required" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        // Get indexers
        const indexersRes = await fetch(
            `http://${process.env.JACKETT_URL}/api/v2.0/indexers`,
            {
                headers: {
                    Cookie: `Jackett=${process.env.JACKETT_COOKIE}`,
                },
            }
        );

        const allIndexers = await indexersRes.json();
        const indexers = allIndexers.filter((indexer) => indexer.configured);

        // Query all indexers in parallel with timeout
        const searchPromises = indexers.map((indexer) =>
            fetch(
                ` http://${process.env.JACKETT_URL}/api/v2.0/indexers/${
                    indexer.id
                }/results?apikey=${
                    process.env.JACKETT_API
                }&Query=${encodeURIComponent(query)}`,
                { signal: AbortSignal.timeout(8000) }
            )
                .then((res) =>
                    res.ok
                        ? res.json()
                        : Promise.reject(new Error(`HTTP ${res.status}`))
                )
                .then((data) => ({ indexer: indexer.id, data }))
                .catch((error) => ({
                    indexer: indexer.id,
                    error: error.message,
                }))
        );

        const results = await Promise.allSettled(searchPromises);

        // Combine successful results
        const allResults = results
            .filter(
                (result) => result.status === "fulfilled" && result.value.data
            )
            .flatMap((result) => result.value.data.Results || []);

        return new Response(
            JSON.stringify({ data: { Results: allResults }, indexers }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control":
                        "public, s-maxage=7200, stale-while-revalidate=7200",
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: "Search failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
