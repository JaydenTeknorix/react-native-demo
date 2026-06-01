import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 24px;
`;

export const Header = styled.View`
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const Greeting = styled.Text`
  font-size: 14px;
  color: #6c757d;
  font-weight: 400;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin-top: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
`;

export const CardRow = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin-bottom: 24px;
`;

export const Card = styled.TouchableOpacity`
  width: 160px;
  height: 120px;
  background-color: #ffffff;
  border-radius: 16px;
  margin-right: 12px;
  padding: 16px;
  justify-content: flex-end;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 3;
`;

export const CardLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

export const CardSubLabel = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
`;

export const CardAccent = styled.View<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const ActivityItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ActivityDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  margin-right: 12px;
`;

export const ActivityText = styled.Text`
  font-size: 14px;
  color: #1a1a2e;
  flex: 1;
`;

export const ActivityTime = styled.Text`
  font-size: 12px;
  color: #adb5bd;
`;
