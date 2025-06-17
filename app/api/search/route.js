export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const res = await fetch(
        `http://${process.env.JACKETT_URL}/api/v2.0/indexers/all/results?apikey=${process.env.JACKETT_API}&Query=${encodeURIComponent(
            query
        )}`
    );
    const data = await res.json();
    return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=7200, stale-while-revalidate=7200" },
    });
}
