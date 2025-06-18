import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/24/solid";
import { formatSize } from "../utils/detectSeriesType";

export default function Table({ results }) {
    return (
        <table className="w-full text-sm text-left text-gray-200 border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-800 uppercase text-xs text-gray-400">
                    <th className="px-3 py-3 border border-gray-700">
                        Category
                    </th>
                    <th className="px-3 py-3 border border-gray-700">Name</th>
                    <th className="px-3 py-3 border border-gray-700">
                        Download
                    </th>
                    <th className="px-3 py-3 border border-gray-700">Size</th>
                    <th className="px-3 py-3 border border-gray-700">&uarr;</th>
                    <th className="px-3 py-3 border border-gray-700">&darr;</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, i) => (
                    <TableRow key={i} data={result} />
                ))}
            </tbody>
        </table>
    );
}

function getTorrentDownloadUrl(data) {
    // Priority 1: Extract direct torrent URL from description
    if (data.Description && typeof data.Description === "string") {
        const torrentMatch = data.Description.match(/href="([^"]*\.torrent)"/);
        if (torrentMatch) {
            return torrentMatch[1];
        }
    }

    // Priority 2: Handle specific trackers
    if (data.Details) {
        // Nyaa.si
        if (data.Details.includes("nyaa.si/view/")) {
            const match = data.Details.match(/nyaa\.si\/view\/(\d+)/);
            if (match) {
                return `https://nyaa.si/download/${match[1]}.torrent`;
            }
        }

        // Add other trackers as needed
        // if (data.Details.includes('other-tracker.com')) { ... }
        if (data.TrackerId === "anidex") {
            return data.Guid;
        }
    }

    return null;
}

function TableRow({ data }) {
    function getTrackerStyle(tracker) {
        const styles = {
            "Anime Tosho": "bg-blue-600",
            "Nyaa.si": "bg-green-600",
            "Tokyo Toshokan": "bg-red-900",
        };
        return styles[tracker] || "bg-purple-600";
    }

    const torrentUrl = getTorrentDownloadUrl(data);

    return (
        <tr>
            <td className="px-3 py-4 border border-gray-700">
                <span
                    title={data.Tracker}
                    className={`inline-block text-white text-xs font-semibold px-2 py-1 rounded truncate max-w-24  ${getTrackerStyle(
                        data.Tracker
                    )}`}
                >
                    {data.Tracker}
                </span>
            </td>
            <td className="px-3 py-4 text-blue-300 hover:underline cursor-pointer text-base max-w-[50rem] border border-gray-700">
                {data.Title}
            </td>
            <td className="px-3 py-4 border border-gray-700">
                <div className="flex gap-2 ml-2 items-center">
                    <a href={data.MagnetUri} title="Magnet Link">
                        <LinkIcon className="w-5 h-5 text-blue-400 hover:text-blue-200" />
                    </a>
                    <a href={torrentUrl} title="Download .torrent">
                        <ArrowDownTrayIcon className="w-5 h-5 text-blue-400 hover:text-blue-200" />
                    </a>
                </div>
            </td>
            <td className="px-3 py-4 border border-gray-700">
                {formatSize(data.Size)}
            </td>
            <td className="px-3 py-4 text-green-400 border border-gray-700">
                {data.Seeders}
            </td>
            <td className="px-3 py-4 text-red-400 border border-gray-700">
                {data.Peers}
            </td>
        </tr>
    );
}
