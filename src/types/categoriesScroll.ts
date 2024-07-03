// Interface for the CategoriesScroll component
export interface CategoriesScrollProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}
