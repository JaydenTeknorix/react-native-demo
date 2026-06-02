import React, { useState } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { DUMMY_ISSUES } from '../data/dummyIssues';
import { IssueStatus } from '../types/issue';
import {
  CATEGORY_COLORS,
  CATEGORY_MARKER_COLORS,
  STATUS_LABELS,
  formatDate,
} from '../utils/issueHelpers';
import {
  ScreenContainer,
  HeroImage,
  HeroPlaceholder,
  BackButton,
  ContentCard,
  TitleRow,
  IssueTitle,
  StatusBadge,
  StatusBadgeText,
  MetaRow,
  MetaText,
  Divider,
  SectionLabel,
  DescriptionText,
  MapPreviewContainer,
  StatusButtonsRow,
  StatusButton,
  StatusButtonText,
} from '../styles/IssueDetailScreen.styles';

type HomeStackParamList = {
  Feed: undefined;
  IssueDetail: { issueId: string };
};

type DetailRouteProp = RouteProp<HomeStackParamList, 'IssueDetail'>;

const STATUS_OPTIONS: IssueStatus[] = ['not_done', 'in_progress', 'completed'];

// In-memory status override (real apps would use Zustand/API)
const statusOverrides: Record<string, IssueStatus> = {};

export default function IssueDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<DetailRouteProp>();
  const { issueId } = route.params;
  const insets = useSafeAreaInsets();

  const issue = DUMMY_ISSUES.find((i) => i.id === issueId);
  const [currentStatus, setCurrentStatus] = useState<IssueStatus>(
    statusOverrides[issueId] ?? issue?.status ?? 'not_done'
  );

  if (!issue) {
    return null;
  }

  const handleStatusChange = (status: IssueStatus) => {
    statusOverrides[issueId] = status;
    setCurrentStatus(status);
    Alert.alert('Status Updated', `Issue marked as "${STATUS_LABELS[status]}"`);
  };

  const catBg = CATEGORY_COLORS[issue.category];
  const markerColor = CATEGORY_MARKER_COLORS[issue.category];

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={{ paddingTop: insets.top }}
      >
        {/* Hero */}
        {issue.imageUri ? (
          <HeroImage source={{ uri: issue.imageUri }} resizeMode="cover" />
        ) : (
          <HeroPlaceholder bg={catBg}>
            <Ionicons name="image-outline" size={48} color="#adb5bd" />
          </HeroPlaceholder>
        )}

        {/* Floating back button */}
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            // Helps the overlay stay above other views on Android.
            elevation: 10,
          }}
        >
          <BackButton
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            style={{ top: insets.top + 8, left: 16 + insets.left }}
          >
            <Ionicons name="chevron-back" size={22} color="#1a1a2e" />
          </BackButton>
        </View>

        {/* Content card */}
        <ContentCard>
          <TitleRow>
            <IssueTitle>{issue.title}</IssueTitle>
            <StatusBadge status={currentStatus}>
              <StatusBadgeText status={currentStatus}>
                {STATUS_LABELS[currentStatus]}
              </StatusBadgeText>
            </StatusBadge>
          </TitleRow>

          <MetaRow>
            <Ionicons name="location-outline" size={14} color="#6c757d" />
            <MetaText numberOfLines={2}>{issue.location.address}</MetaText>
          </MetaRow>

          <MetaRow>
            <Ionicons name="calendar-outline" size={14} color="#6c757d" />
            <MetaText>{formatDate(issue.createdAt)}</MetaText>
          </MetaRow>

          <MetaRow>
            <Ionicons name="pricetag-outline" size={14} color="#6c757d" />
            <MetaText>{issue.category}</MetaText>
          </MetaRow>

          <Divider />

          {/* Description */}
          <SectionLabel>Description</SectionLabel>
          <DescriptionText>{issue.description}</DescriptionText>

          <Divider />

          {/* Map preview */}
          <SectionLabel>Location</SectionLabel>
          <MapPreviewContainer>
            <MapView
              style={{ flex: 1 }}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              initialRegion={{
                latitude: issue.location.latitude,
                longitude: issue.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: issue.location.latitude,
                  longitude: issue.location.longitude,
                }}
                pinColor={markerColor}
                title={issue.title}
              />
            </MapView>
          </MapPreviewContainer>

          <Divider />

          {/* Status changer */}
          <SectionLabel>Change Status</SectionLabel>
          <StatusButtonsRow>
            {STATUS_OPTIONS.map((s) => (
              <StatusButton
                key={s}
                variant={s}
                active={currentStatus === s}
                onPress={() => handleStatusChange(s)}
                activeOpacity={0.8}
              >
                <StatusButtonText variant={s} active={currentStatus === s}>
                  {STATUS_LABELS[s]}
                </StatusButtonText>
              </StatusButton>
            ))}
          </StatusButtonsRow>
        </ContentCard>
      </ScrollView>
    </ScreenContainer>
  );
}
