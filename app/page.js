"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Filter from "./_components/Filter";
import Table from "./_components/Table";
import { useFilter } from "./FilterContext";
import SearchBar from "./_components/SearchBar";
import ErrorAlert from "./_components/ErrorAlert";
import EmptySearch from "./_components/EmptySearch";
import NoResults from "./_components/NoResults";
import { useFilteredResults } from "./hooks/useFilteredResults";

const fetcher = (url) => fetch(url).then((res) => res.json());

function SimpleSpinner() {
    return (
        <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );
}

function Page() {
    const [query, setQuery] = useState("");
    const [searchUrl, setSearchUrl] = useState(null);
    const {
        sortBy,
        sortOrder,
        sourceFilter,
        setSources,
        seriesTypeFilter,
        categoryFilter,
    } = useFilter();

    const {
        data: searchData,
        isLoading,
        error,
    } = useSWR(searchUrl, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
        dedupingInterval: 7200000,
        onSuccess: (data) => {
            const indexers = data.indexers.map((indexer) => indexer.name);
            setSources(indexers);
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (!query) return;
        setSearchUrl(`/api/search?q=${encodeURIComponent(query)}`);
    }

    const filteredResults = useFilteredResults({
        searchData,
        sourceFilter,
        seriesTypeFilter,
        sortBy,
        sortOrder,
        categoryFilter,
    });

    useEffect(() => {
        if (!query) {
            setSearchUrl(null);
        }
    }, [query]);

    return (
        <div className="w-[1200px] mx-auto flex flex-col min-h-screen py-6">
            <div className="flex items-center gap-2">
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    handleSubmit={handleSubmit}
                />
                <Filter />
            </div>

            {/* Error State */}
            {error && <ErrorAlert />}

            {/* Loading State */}
            {isLoading && <SimpleSpinner />}

            {/* Results */}
            {!isLoading && !error && (
                <div className="mt-5">
                    {/* Empty State - No Search Yet */}
                    {!searchUrl && <EmptySearch />}

                    {/* Empty State - No Results */}
                    {searchUrl && filteredResults.length === 0 && query && (
                        <NoResults query={query} />
                    )}

                    {/* Results Table */}
                    {filteredResults.length > 0 && (
                        <Table results={filteredResults} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Page;
