// Interface for the CategoriesScroll component
export interface CategoriesScrollProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}
