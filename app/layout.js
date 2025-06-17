import { FilterProvider } from "./FilterContext";
import "./globals.css";

export const metadata = {
    title: "TorrentFinder",
    description: "Fast and reliable torrent search engine. Find torrents across multiple indexers with advanced filtering and sorting options.",};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                {" "}
                <FilterProvider>{children}</FilterProvider>
            </body>
        </html>
    );
}
