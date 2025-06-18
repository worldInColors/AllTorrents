"use client";
import { useMemo } from "react";
import { detectCategory, detectSeriesType } from "../utils/detectSeriesType";

export function useFilteredResults({
    searchData,
    sourceFilter,
    seriesTypeFilter,
    sortBy,
    sortOrder,
    categoryFilter,
}) {
    const filteredResults = useMemo(() => {
        const results = searchData?.data?.Results || [];
        if (!results.length) return [];

        let filtered = [...results];

        if (sourceFilter && sourceFilter !== "all") {
            filtered = filtered.filter(
                (torrent) => torrent.Tracker === sourceFilter
            );
        }

        if (seriesTypeFilter && seriesTypeFilter !== "all") {
            filtered = filtered.filter((torrent) => {
                const detectedType = detectSeriesType(torrent.Title);
                return detectedType === seriesTypeFilter;
            });
        }
        if (categoryFilter && categoryFilter !== "all") {
            filtered = filtered.filter((torrent) => {
                const detectedCategory = detectCategory({
                    title: torrent.Title,
                    categoryDesc: torrent.CategoryDesc,
                });
                return detectedCategory === categoryFilter;
            });
        }

        switch (sortBy) {
            case "seeds":
                filtered.sort((a, b) =>
                    sortOrder === "asc"
                        ? a.Seeders - b.Seeders
                        : b.Seeders - a.Seeders
                );
                break;
            case "peers":
                filtered.sort((a, b) =>
                    sortOrder === "asc" ? a.Peers - b.Peers : b.Peers - a.Peers
                );
                break;
            case "size":
                filtered.sort((a, b) =>
                    sortOrder === "asc" ? a.Size - b.Size : b.Size - a.Size
                );
                break;
            default:
                filtered.sort((a, b) => b.Seeders - a.Seeders);
                break;
        }

        return filtered;
    }, [
        searchData?.data?.Results,
        sortBy,
        sortOrder,
        sourceFilter,
        seriesTypeFilter,
        categoryFilter,
    ]);

    return filteredResults;
}
