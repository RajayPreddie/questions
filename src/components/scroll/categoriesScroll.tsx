import { type CategoriesScrollProps } from '../../types/categoriesScroll';
import {
  Box,
  Popover,
  ScrollArea,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useRef, useState } from 'react';
const categories = [
  'General Knowledge',
  'History',
  'Geography',
  'Science',
  'Literature',
  'Art',
  'Technology',
  'Software Development',
  'Hardware',
  'Internet & Networking',
  'Artificial Intelligence',
  'Cybersecurity',
  'Entertainment',
  'Movies',
  'Music',
  'Television Shows',
  'Video Games',
  'Celebrities',
  'Sports',
  'Football (Soccer)',
  'Basketball',
  'Baseball',
  'Tennis',
  'Olympic Games',
  'Education',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Languages',
  'Health and Fitness',
  'Nutrition',
  'Exercise',
  'Mental Health',
  'Diseases and Conditions',
  'Medical Treatments',
  'Business and Finance',
  'Economics',
  'Investment',
  'Entrepreneurship',
  'Marketing',
  'Management',
  'Lifestyle',
  'Travel',
  'Food and Drink',
  'Fashion',
  'Home and Garden',
  'Relationships',
  'Society and Culture',
  'Politics',
  'Religion',
  'Philosophy',
  'Sociology',
  'Traditions',
  'Science and Nature',
  'Astronomy',
  'Biology',
  'Ecology',
  'Physics',
  'Chemistry',
  'Trivia and Fun Facts',
  'Oddities',
  'Records',
  'Amazing Facts',
  'Riddles',
  'Quizzes',
  'Current Events',
  'News',
  'World Events',
  'Local Events',
  'Weather',
  'Social Issues',
];

// TODO Props: Category selected for search
// TODO: Props: List of available categories
const CategoriesScroll: React.FC<CategoriesScrollProps> = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const filtered = categories.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
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
        <TextInput
          value={query}
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setHovered(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex =
                  current + 1 >= filtered.length ? current : current + 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex = current - 1 < 0 ? current : current - 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }
          }}
          placeholder="Search categories"
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
