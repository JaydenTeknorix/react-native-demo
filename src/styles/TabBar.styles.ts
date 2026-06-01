import styled from 'styled-components/native';

export const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #f1f3f5;
  padding-bottom: 8px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 10;
`;

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: 10px;
  gap: 4px;
`;

export const TabLabel = styled.Text<{ active: boolean }>`
  font-size: 11px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#4361ee' : '#adb5bd')};
`;
