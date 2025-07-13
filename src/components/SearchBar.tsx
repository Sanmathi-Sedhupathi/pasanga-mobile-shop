import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  onSearch: (term: string) => void;
}

const SearchBar = ({ onCategorySelect, selectedCategory, onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "One Sound CRACKERS",
    "GROUND CHAKKAR", 
    "ELITE CHAKKAR",
    "FLOWER POTS",
    "ELITE FLOWER POTS",
    "ELITE FOUNTAIN",
    "PENCIL",
    "ROCKETS",
    "ATOM BOMBS",
    "BIJILI CRACKERS",
    "GARLAND",
    "SPECIAL NOVELTIES",
    "PEACOCK VARIETIES",
    "ELITE PRO MAX",
    "PREMIUM VARIETIES"
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-3 items-center">
        {/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] bg-primary text-white hover:bg-primary-dark">
              <Filter className="w-4 h-4 mr-2" />
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto bg-white z-50">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`cursor-pointer ${
                  selectedCategory === category ? "bg-primary text-white" : ""
                }`}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for an item"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;