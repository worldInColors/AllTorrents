function NoResults({query}) {
  return (
     <div className="text-gray-400 py-12 text-center">
              <p className="text-lg">No results found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2">Try different keywords or check your filters</p>
            </div>
  );
}

export default NoResults;
