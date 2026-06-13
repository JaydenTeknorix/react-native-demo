import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNetworkState } from 'expo-network';
import { FlatList, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIssues } from '../store/issuesStore';
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
  SearchRow,
  SearchInput,
  SearchActions,
  FilterIconButton,
  IssueCard,
  IssueCardImage,
  IssueCardImagePlaceholder,
  IssueCardBody,
  IssueCardRow,
  IssueCardTitle,
  StatusBadge,
  StatusBadgeText,
  IssueMeta,
  IssueId,
  CategoryTag,
  CategoryTagText,
  EmptyState,
  EmptyStateText,
  ModalBackdrop,
  FilterSheet,
  SheetHandle,
  SheetTitle,
  SectionLabel,
  OptionRow,
  OptionChip,
  OptionChipText,
  SheetFooter,
  FooterButton,
  FooterButtonText,
  OfflineBanner,
  BannerText,
} from '../styles/IssueFeedScreen.styles';
import TabBar from '../components/TabBar';
import type { AppStackParams } from '../AppLayout';

type NavProp = NativeStackNavigationProp<AppStackParams, 'Feed'>;
const STATUS_OPTIONS: IssueStatus[] = ['not_done', 'in_progress', 'completed'];

export default function IssueFeedScreen() {
  const navigation = useNavigation<NavProp>();
  const { issues, loading, reloadIssues } = useIssues();
  const networkState = useNetworkState();

  const [query, setQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<IssueStatus[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<IssueCategory[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadIssues();
    setRefreshing(false);
  };

  const toggleStatus = (status: IssueStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((v) => v !== status) : [...prev, status]
    );
  };

  const toggleCategory = (category: IssueCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((v) => v !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedCategories([]);
  };

  const filtered = issues.filter((issue) => {
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(issue.status);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(issue.category);
    const q = query.toLowerCase();
    const matchesQuery =
      issue.title.toLowerCase().includes(q) ||
      issue.description.toLowerCase().includes(q) ||
      issue.location.address.toLowerCase().includes(q);
    return matchesStatus && matchesCategory && matchesQuery;
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

      <IssueId>#ISSUE:{item.id.toString().slice(-4).toUpperCase()}</IssueId>

      <IssueCardBody>
        <IssueCardRow>
          <IssueCardTitle numberOfLines={1}>{item.title}</IssueCardTitle>
          <StatusBadge status={item.status}>
            <StatusBadgeText status={item.status}>
              {STATUS_LABELS[item.status]}
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
      {networkState.isConnected === false && (
        <OfflineBanner>
          <BannerText>Offline – displaying cached data</BannerText>
        </OfflineBanner>
      )}
      <SafeAreaView edges={['top']}>
        <HeaderArea>
          <HeaderTitle>CityReport</HeaderTitle>

          <SearchRow>
            <Ionicons name="search-outline" size={18} color="#adb5bd" />
            <SearchInput
              placeholder="Search issues, locations…"
              placeholderTextColor="#adb5bd"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            <SearchActions>
              {query.length > 0 && (
                <FilterIconButton onPress={() => setQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#adb5bd" />
                </FilterIconButton>
              )}
              <FilterIconButton onPress={() => setFilterVisible(true)}>
                <Ionicons
                  name="options-outline"
                  size={18}
                  color={selectedStatuses.length || selectedCategories.length ? '#4361EE' : '#6c757d'}
                />
              </FilterIconButton>
            </SearchActions>
          </SearchRow>
        </HeaderArea>
      </SafeAreaView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="alert-circle-outline" size={48} color="#dee2e6" />
            <EmptyStateText>
              {loading ? 'Loading…' : 'No issues yet.\nLong-press on the map to report one.'}
            </EmptyStateText>
          </EmptyState>
        }
      />

      {/* Filter sheet */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
          <ModalBackdrop>
            <TouchableWithoutFeedback onPress={() => { }}>
              <FilterSheet>
                <SheetHandle />
                <SheetTitle>Filter Issues</SheetTitle>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <SectionLabel>Status</SectionLabel>
                  <OptionRow>
                    {STATUS_OPTIONS.map((status) => {
                      const active = selectedStatuses.includes(status);
                      return (
                        <OptionChip key={status} active={active} onPress={() => toggleStatus(status)}>
                          <OptionChipText active={active}>{STATUS_LABELS[status]}</OptionChipText>
                        </OptionChip>
                      );
                    })}
                  </OptionRow>

                  <SectionLabel>Category</SectionLabel>
                  <OptionRow>
                    {CATEGORIES.map((category) => {
                      const active = selectedCategories.includes(category);
                      return (
                        <OptionChip
                          key={category}
                          active={active}
                          onPress={() => toggleCategory(category)}
                        >
                          <OptionChipText active={active}>{category}</OptionChipText>
                        </OptionChip>
                      );
                    })}
                  </OptionRow>

                  <SheetFooter>
                    <FooterButton onPress={clearFilters}>
                      <FooterButtonText>Reset</FooterButtonText>
                    </FooterButton>
                    <FooterButton primary onPress={() => setFilterVisible(false)}>
                      <FooterButtonText primary>Apply</FooterButtonText>
                    </FooterButton>
                  </SheetFooter>
                </ScrollView>
              </FilterSheet>
            </TouchableWithoutFeedback>
          </ModalBackdrop>
        </TouchableWithoutFeedback>
      </Modal>

      <TabBar />
    </ScreenContainer>
  );
}
