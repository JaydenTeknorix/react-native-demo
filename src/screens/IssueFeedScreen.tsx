import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DUMMY_ISSUES } from '../data/dummyIssues';
import { Issue, IssueCategory, IssueStatus } from '../types/issue';
import {
  CATEGORIES,
  CATEGORY_COLORS,
  STATUS_LABELS,
  formatDate,
} from '../utils/issueHelpers';
import {
  ScreenContainer,
  HeaderArea,
  HeaderTitle,
  HeaderSubtitle,
  SearchRow,
  SearchInput,
  FilterScroll,
  FilterChip,
  FilterChipText,
  IssueCard,
  IssueCardImage,
  IssueCardImagePlaceholder,
  IssueCardBody,
  IssueCardRow,
  IssueCardTitle,
  StatusBadge,
  StatusBadgeText,
  IssueMeta,
  CategoryTag,
  CategoryTagText,
  EmptyState,
  EmptyStateText,
} from '../styles/IssueFeedScreen.styles';
import TabBar from '../components/TabBar';
import type { AppStackParams } from '../AppLayout';

const ALL_FILTERS = ['All', ...CATEGORIES] as const;
type FilterValue = 'All' | IssueCategory;

type NavProp = NativeStackNavigationProp<AppStackParams, 'Feed'>;

export default function IssueFeedScreen() {
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');

  const filtered = DUMMY_ISSUES.filter((issue) => {
    const matchesCategory = activeFilter === 'All' || issue.category === activeFilter;
    const matchesQuery =
      issue.title.toLowerCase().includes(query.toLowerCase()) ||
      issue.description.toLowerCase().includes(query.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const renderItem = ({ item }: { item: Issue }) => (
    <IssueCard
      activeOpacity={0.85}
      onPress={() => navigation.navigate('IssueDetail', { issueId: item.id })}
    >
      {item.imageUri ? (
        <IssueCardImage source={{ uri: item.imageUri }} resizeMode="cover" />
      ) : (
        <IssueCardImagePlaceholder bg={CATEGORY_COLORS[item.category]}>
          <Ionicons name="image-outline" size={36} color="#adb5bd" />
        </IssueCardImagePlaceholder>
      )}

      <IssueCardBody>
        <IssueCardRow>
          <IssueCardTitle numberOfLines={1}>{item.title}</IssueCardTitle>
          <StatusBadge status={item.status}>
            <StatusBadgeText status={item.status}>
              {STATUS_LABELS[item.status as IssueStatus]}
            </StatusBadgeText>
          </StatusBadge>
        </IssueCardRow>

        <IssueMeta numberOfLines={1}>
          <Ionicons name="location-outline" size={12} color="#6c757d" />{' '}
          {item.location.address}
        </IssueMeta>
        <IssueMeta>{formatDate(item.createdAt)}</IssueMeta>

        <CategoryTag bg={CATEGORY_COLORS[item.category]}>
          <CategoryTagText>{item.category}</CategoryTagText>
        </CategoryTag>
      </IssueCardBody>
    </IssueCard>
  );

  return (
    <ScreenContainer>
      <SafeAreaView edges={['top']}>
        <HeaderArea>
          <HeaderTitle>CityReport</HeaderTitle>
          <HeaderSubtitle>Community issue tracker</HeaderSubtitle>

          <SearchRow>
            <Ionicons name="search-outline" size={18} color="#adb5bd" />
            <SearchInput
              placeholder="Search issues, locations…"
              placeholderTextColor="#adb5bd"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Ionicons
                name="close-circle"
                size={18}
                color="#adb5bd"
                onPress={() => setQuery('')}
              />
            )}
          </SearchRow>
        </HeaderArea>
      </SafeAreaView>

      {/* Category filter */}
      <FilterScroll>
        {ALL_FILTERS.map((f) => (
          <FilterChip
            key={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f as FilterValue)}
          >
            <FilterChipText active={activeFilter === f}>{f}</FilterChipText>
          </FilterChip>
        ))}
      </FilterScroll>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="alert-circle-outline" size={48} color="#dee2e6" />
            <EmptyStateText>No issues found</EmptyStateText>
          </EmptyState>
        }
      />

      <TabBar />
    </ScreenContainer>
  );
}
