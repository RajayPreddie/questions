import { type CategoriesScrollProps } from '@/types/categoriesScroll';
import {
  Box,
  MultiSelect,
  Popover,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRef, useState } from 'react';

const CategoriesScroll: React.FC<CategoriesScrollProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  // Save state for the category search value
  const [searchCategory, setSearchCategory] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);
  // Handle opening and hovering over the dropdown
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(-1);
  // Filter the categories by the search value
  const filtered = categories.filter((item) =>
    item.toLowerCase().includes(searchCategory.toLowerCase()),
  );
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <Popover width="target" opened={opened}>
      <Popover.Target>
        <MultiSelect
          searchable
          searchValue={searchCategory}
          data={categories}
          onSearchChange={(value) => {
            setSearchCategory(value);
            setSelectedCategories([value]);
            setHovered(-1);
          }}
          onChange={(values) => {
            setSelectedCategories(values);
            setOpened(false);
          }}
          placeholder="Select or add up to 3 categories"
          maxValues={3}
        />
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <ScrollArea.Autosize
          viewportRef={viewportRef}
          mah={200}
          type="always"
          scrollbars="y"
        >
          <Box px="xs" py={5}>
            {items.length > 0 ? items : <Text c="dimmed">Nothing found</Text>}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CategoriesScroll;
