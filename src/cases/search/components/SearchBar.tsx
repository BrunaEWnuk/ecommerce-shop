import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 border rounded-xl p-2 bg-white">
      <Search size={18} className="text-gray-500" />
      <input
        className="w-full outline-none"
        placeholder="Buscar produtos..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}
