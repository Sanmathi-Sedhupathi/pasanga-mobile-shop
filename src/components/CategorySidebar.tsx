import { useState } from "react";

const CategorySidebar = ({ onCategorySelect, selectedCategory }: {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}) => {
  const categories = [
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
    "PREMIUM VARIETIES",
    "Water Function",
    "MULTI COLOUR REPEATING SHOTS",
    "ELITE REPEATING SHOTS", 
    "FANCY PIPE OUT",
    "Kids Special",
    "Matches",
    "STANDARD FW FAMILY PACK",
    "FANCY SPARKLERS",
    "GIFT BOXES"
  ];

  return (
    <div className="bg-category-bg text-category-text rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Category</h2>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;