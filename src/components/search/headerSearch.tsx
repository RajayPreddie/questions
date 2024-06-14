import classes from '../../styles/HeaderSearch.module.css';
import { Autocomplete, Group, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const HeaderSearch = () => {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Autocomplete
            size="lg"
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
};

export default HeaderSearch;
