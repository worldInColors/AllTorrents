"use client";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFilter } from "../FilterContext";

function Filter() {
    const {
        openFilterModal,
        setOpenFilterModal,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        sourceFilter,
        setSourceFilter,
        sources,
        seriesTypeFilter,
        setSeriesTypeFilter,
        setCategoryFilter,
        categoryFilter,
    } = useFilter();
    return (
        <>
            <div>
                <FunnelIcon
                    className="w-9 text-gray-700 cursor-pointer hover:text-gray-500 transition-all"
                    onClick={() => setOpenFilterModal(true)}
                />
            </div>
            {openFilterModal && (
                <div
                    className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setOpenFilterModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-700 rounded-xl shadow-lg p-6 relative w-[90%] max-w-2xl "
                    >
                        <button
                            onClick={() => setOpenFilterModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer "
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <div className="content">
                            <h2 className="text-xl font-semibold mb-4">
                                Filter Options
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Default</option>
                                        <option value="seeds">Seeds</option>
                                        <option value="peers">Peers</option>
                                        <option value="size">Size</option>
                                    </select>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Sort Order
                                    </label>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) =>
                                            setSortOrder(e.target.value)
                                        }
                                        disabled={!sortBy}
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="desc">
                                            High to Low
                                        </option>
                                        <option value="asc">Low to High</option>
                                    </select>
                                </div>

                                {/* Source Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Source
                                    </label>
                                    <select
                                        value={sourceFilter}
                                        onChange={(e) =>
                                            setSourceFilter(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Sources</option>
                                        {sources.map((source) => (
                                            <option key={source} value={source}>
                                                {source}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Series Type
                                    </label>
                                    <select
                                        value={seriesTypeFilter}
                                        onChange={(e) =>
                                            setSeriesTypeFilter(e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="single-episode">
                                            Single Episodes
                                        </option>
                                        <option value="season-batch">
                                            Season/Batch
                                        </option>
                                        <option value="full-series">
                                            Complete Series
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
                                    >
                                        <option value="all">
                                            All Categories
                                        </option>
                                        <option value="anime">Anime</option>
                                        <option value="movie">Movies</option>
                                        <option value="book">Books</option>
                                        <option value="music">Music</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Filter;
