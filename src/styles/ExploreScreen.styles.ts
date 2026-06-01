import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  margin: 16px 24px 8px;
  padding: 12px 16px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: #1a1a2e;
  margin-left: 8px;
`;

export const FilterRow = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24, paddingVertical: 8 },
}))``;

export const FilterChip = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 18px;
  border-radius: 20px;
  margin-right: 8px;
  background-color: ${({ active }) => (active ? '#4361ee' : '#ffffff')};
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#4361ee' : '#dee2e6')};
`;

export const FilterChipText = styled.Text<{ active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#6c757d')};
`;

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 16px;
`;

export const GridItem = styled.TouchableOpacity`
  width: 48%;
  margin: 1%;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 3;
`;

export const GridItemImage = styled.View<{ color: string }>`
  height: 100px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
`;

export const GridItemBody = styled.View`
  padding: 12px;
`;

export const GridItemTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const GridItemMeta = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
`;

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  padding: 24px 24px 0;
`;
