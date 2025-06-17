import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function EmptySearch() {
  return (
   <div className="text-gray-400 py-12 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-lg">Search for torrents to get started</p>
            </div>
  );
}

export default EmptySearch;
