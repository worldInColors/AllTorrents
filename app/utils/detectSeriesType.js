export function detectSeriesType(title) {
    const titleLower = title.toLowerCase();

    // Single Episode indicators (check first to avoid false positives)
    const singleEpisodePatterns = [
        /\bs\d+e\d+\b/i, // S01E28, S01E27, etc.
        /\sepisode\s+\d+(?!\s*-\s*\d+)\b/i, // "Episode 5" but not "Episode 1-28"
        /\sep\s*\d+(?!\s*-\s*\d+)\b/i, // "Ep 28" but not "Ep 1-28"
        /\s-\s+\d+\s*(?:\[|\.|$)/i, // "- 23 [" or "- 23." or "- 23" at end
        /\s\d+\s+of\s+\d+(?!\s*-)/i, // "12 of 24" but not part of range
        /\s-\s+\d+\s+\[/i, // "- 23 [1080p" format
    ];

    // Full Series indicators (complete series with multiple seasons)
    const fullSeriesPatterns = [
        /complete\s+series/i,
        /\bseries\s+complete\b/i,
        /\bcomplete\s+collection\b/i,
        /\b(s\d+-s\d+|\d+-\d+\s+seasons?)\b/i, // S01-S03 or 1-3 seasons
        /\(\d{4}-\d{4}\)/i, // Year ranges like (2009-2019)
        /all\s+seasons?/i,
        /seasons?\s+\d+\s*-\s*\d+/i, // "Seasons 1-3"
    ];

    // Season/Batch indicators (single season or episode batch)
    const seasonBatchPatterns = [
        /\bbatch\b/i,
        /\bseason\s+\d+(?:\s*\+\s*(?:ovas?|specials?))?(?!\s*-\s*\d+)\b/i, // "Season 1" or "Season 1+OVAs" but not "Season 1-3"
        /\bs\d+(?:\s*complete|\s*\[complete\])?\b/i, // "S01" when it's a season
        /\b\d+\s*-\s*\d+\b/i, // Episode ranges like "01-28", "1-28"
        /\bep\s*\d+\s*-\s*\d+/i, // "Ep 01-28"
        /\bepisode\s*\d+\s*-\s*\d+/i, // "Episode 1-28"
        /\(\d+\s*-\s*\d+\)/i, // "(01-28)"
        /\[ep\s+\d+-\d+\s+of\s+\d+\]/i, // [Ep 01-328 of 328]
        /\bunofficial\s+batch\b/i,
        /\[bd\]/i, // BD releases are often full seasons
        /\[bdrip\]/i, // BDRip releases are often full seasons
        /bd\s*remux/i, // BD Remux are typically full seasons
        /complete\s+season/i,
    ];

    // Check for single episodes first (to avoid false positives from batch patterns)
    if (singleEpisodePatterns.some((pattern) => pattern.test(title))) {
        // Double-check it's not actually a batch that happens to have episode info
        const hasBatchIndicators =
            /\bbatch\b|complete|season.*\d+|\d+\s*-\s*\d+(?!\s*\[)/i.test(
                title
            );
        if (!hasBatchIndicators) {
            return "single-episode";
        }
    }

    // Check for full series first (more specific than season batch)
    if (fullSeriesPatterns.some((pattern) => pattern.test(title))) {
        return "full-series";
    }

    // Check for season/batches
    if (seasonBatchPatterns.some((pattern) => pattern.test(title))) {
        return "season-batch";
    }
    return "unknown";
}
export function detectCategory({ title, categoryDesc }) {
    const titleLower = title.toLowerCase();
    const categories = categoryDesc
        .split(",")
        .map((c) => c.trim().toLowerCase());

    const isAnime = categories.some((c) => c.includes("anime"));
    const isMovie = categories.some((c) => c.includes("movie"));
    const isBook = categories.some(
        (c) => c.includes("books") || c.includes("manga")
    );
    const isMusic = categories.some(
        (c) => c.includes("music") || c.includes("audio")
    );

    if (isMovie) return "movie";
    if (isAnime) return "anime";
    if (isBook) {
        return "book";
    }
    if (isMusic) return "music";

    return "other";
}

export function formatSize(bytes) {
    const units = ["B", "KiB", "MiB", "GiB", "TiB"];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${parseFloat(bytes.toFixed(2))} ${units[i]}`;
}
