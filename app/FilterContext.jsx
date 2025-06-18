"use client";
const { createContext, useContext, useState } = require("react");

const filterContext = createContext();

export function FilterProvider({ children }) {
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [sourceFilter, setSourceFilter] = useState("");
    const [sources, setSources] = useState([]);
    const [seriesTypeFilter, setSeriesTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const value = {
        openFilterModal,
        setOpenFilterModal,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        setSortBy,
        sourceFilter,
        setSourceFilter,
        sources,
        setSources,
        seriesTypeFilter,
        setSeriesTypeFilter,
        categoryFilter,
        setCategoryFilter,
    };
    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(filterContext);
    if (!context) throw new Error("not used within a filter provider");
    return context;
}
