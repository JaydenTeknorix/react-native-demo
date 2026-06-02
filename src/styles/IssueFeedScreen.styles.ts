import styled from 'styled-components/native';

// ── Screen wrapper ──────────────────────────────────────────────
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f4f6fb;
`;

// ── Header ───────────────────────────────────────────────────────
export const HeaderArea = styled.View`
  background-color: #ffffff;
  padding: 16px 20px 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const HeaderTitle = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 13px;
  color: #6c757d;
  margin-top: 2px;
`;

// ── Search bar ────────────────────────────────────────────────────
export const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f4f6fb;
  border-radius: 12px;
  margin-top: 12px;
  padding: 10px 14px;
  border-width: 1px;
  border-color: #e9ecef;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #1a1a2e;
  margin-left: 8px;
`;

export const SearchActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const FilterIconButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;

// ── Filter chips ──────────────────────────────────────────────────
export const FilterScroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 20, paddingVertical: 10 },
}))``;

export const FilterChip = styled.TouchableOpacity<{ active: boolean }>`
  padding: 7px 16px;
  border-radius: 999px;
  margin-right: 8px;
  background-color: ${({ active }) => (active ? '#4361EE' : '#ffffff')};
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#4361EE' : '#dee2e6')};
`;

export const FilterChipText = styled.Text<{ active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#6c757d')};
`;

// ── Issue card ────────────────────────────────────────────────────
export const IssueCard = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 16px;
  margin: 6px 16px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.07;
  shadow-radius: 8px;
  elevation: 3;
`;

export const IssueCardImage = styled.Image`
  width: 100%;
  height: 140px;
`;

export const IssueCardImagePlaceholder = styled.View<{ bg: string }>`
  width: 100%;
  height: 140px;
  background-color: ${({ bg }) => bg};
  justify-content: center;
  align-items: center;
`;

export const IssueCardBody = styled.View`
  padding: 14px 16px;
`;

export const IssueCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const IssueCardTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  flex: 1;
  margin-right: 8px;
`;

export const StatusBadge = styled.View<{ status: string }>`
  padding: 3px 10px;
  border-radius: 999px;
  background-color: ${({ status }) =>
    status === 'completed' ? '#d3f9d8' : status === 'in_progress' ? '#fff3bf' : '#ffd8d8'};
`;

export const StatusBadgeText = styled.Text<{ status: string }>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ status }) =>
    status === 'completed' ? '#1e7e34' : status === 'in_progress' ? '#856404' : '#c0392b'};
`;

export const IssueMeta = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
`;

export const CategoryTag = styled.View<{ bg: string }>`
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  margin-top: 6px;
`;

export const CategoryTagText = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: #1a1a2e;
`;

export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: 60px 32px;
  gap: 12px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #adb5bd;
  text-align: center;
`;

export const ModalBackdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
  justify-content: flex-end;
`;

export const FilterSheet = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 8px 20px 28px;
  max-height: 78%;
`;

export const SheetHandle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #dee2e6;
  align-self: center;
  margin: 10px 0 16px;
`;

export const SheetTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
`;

export const SectionLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #adb5bd;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-top: 18px;
  margin-bottom: 8px;
`;

export const OptionRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OptionChip = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 14px;
  border-radius: 999px;
  background-color: ${({ active }) => (active ? '#4361EE' : '#f4f6fb')};
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#4361EE' : '#dee2e6')};
`;

export const OptionChipText = styled.Text<{ active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#6c757d')};
`;

export const SheetFooter = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 24px;
`;

export const FooterButton = styled.TouchableOpacity<{ primary?: boolean }>`
  flex: 1;
  border-radius: 12px;
  padding: 13px;
  align-items: center;
  border-width: ${({ primary }) => (primary ? 0 : 1)}px;
  border-color: #dee2e6;
  background-color: ${({ primary }) => (primary ? '#4361EE' : '#ffffff')};
`;

export const FooterButtonText = styled.Text<{ primary?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ primary }) => (primary ? '#ffffff' : '#495057')};
`;
