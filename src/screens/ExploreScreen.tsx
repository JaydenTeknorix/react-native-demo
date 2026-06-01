import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  SearchBar,
  SearchInput,
  FilterRow,
  FilterChip,
  FilterChipText,
  Grid,
  GridItem,
  GridItemImage,
  GridItemBody,
  GridItemTitle,
  GridItemMeta,
  PageTitle,
} from '../styles/ExploreScreen.styles';

const FILTERS = ['All', 'Design', 'Dev', 'Marketing', 'Data'];

const ITEMS = [
  { id: '1', title: 'UI Patterns', meta: '24 resources', color: '#dbe4ff', category: 'Design' },
  { id: '2', title: 'React Native', meta: '18 guides', color: '#d3f9d8', category: 'Dev' },
  { id: '3', title: 'Growth Hacks', meta: '9 articles', color: '#fff3bf', category: 'Marketing' },
  { id: '4', title: 'Data Viz', meta: '15 examples', color: '#ffd8d8', category: 'Data' },
  { id: '5', title: 'Animations', meta: '11 demos', color: '#e0c3fc', category: 'Design' },
  { id: '6', title: 'API Design', meta: '7 guides', color: '#c3fae8', category: 'Dev' },
  { id: '7', title: 'SEO Tips', meta: '20 tips', color: '#ffe8cc', category: 'Marketing' },
  { id: '8', title: 'ML Basics', meta: '5 courses', color: '#ffc9c9', category: 'Data' },
];

export default function ExploreScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = ITEMS.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageTitle>Explore</PageTitle>

        <SearchBar>
          <SearchInput
            placeholder="Search..."
            placeholderTextColor="#adb5bd"
            value={query}
            onChangeText={setQuery}
          />
        </SearchBar>

        <FilterRow>
          {FILTERS.map((f) => (
            <FilterChip key={f} active={activeFilter === f} onPress={() => setActiveFilter(f)}>
              <FilterChipText active={activeFilter === f}>{f}</FilterChipText>
            </FilterChip>
          ))}
        </FilterRow>

        <Grid>
          {filtered.map((item) => (
            <GridItem key={item.id} activeOpacity={0.8}>
              <GridItemImage color={item.color} />
              <GridItemBody>
                <GridItemTitle>{item.title}</GridItemTitle>
                <GridItemMeta>{item.meta}</GridItemMeta>
              </GridItemBody>
            </GridItem>
          ))}
        </Grid>
      </ScrollView>
    </Container>
  );
}
