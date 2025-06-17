"use client"
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
function SearchBar({handleSubmit, query, setQuery}) {
  return (
      <form onSubmit={(e) => handleSubmit(e)} className="flex-1">
          <div className="flex items-center bg-gray-800 rounded-md h-10 px-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="bg-transparent text-gray-100 placeholder-gray-400 outline-none ml-2 flex-1"
              placeholder="Search for torrents..."
            />
          </div>
        </form>
  );
}

export default SearchBar;
