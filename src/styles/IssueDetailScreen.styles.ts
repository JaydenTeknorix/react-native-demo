import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f4f6fb;
`;

export const HeroImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const HeroPlaceholder = styled.View<{ bg: string }>`
  width: 100%;
  height: 240px;
  background-color: ${({ bg }) => bg};
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.92);
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.12;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ContentCard = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  margin: -20px 16px 0;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.07;
  shadow-radius: 8px;
  elevation: 3;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const IssueTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  flex: 1;
  margin-right: 10px;
`;

export const StatusBadge = styled.View<{ status: string }>`
  padding: 4px 12px;
  border-radius: 999px;
  background-color: ${({ status }) =>
    status === 'completed' ? '#d3f9d8' : status === 'in_progress' ? '#fff3bf' : '#ffd8d8'};
`;

export const StatusBadgeText = styled.Text<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ status }) =>
    status === 'completed' ? '#1e7e34' : status === 'in_progress' ? '#856404' : '#c0392b'};
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  gap: 6px;
`;

export const MetaText = styled.Text`
  font-size: 13px;
  color: #6c757d;
  flex: 1;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #e9ecef;
  margin: 14px 0;
`;

export const SectionLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #adb5bd;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

export const DescriptionText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #495057;
`;

export const MapPreviewContainer = styled.View`
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 8px;
`;

export const StatusButtonsRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
`;

export const StatusButton = styled.TouchableOpacity<{ active: boolean; variant: string }>`
  flex: 1;
  padding: 10px 6px;
  border-radius: 10px;
  align-items: center;
  border-width: 1.5px;
  border-color: ${({ active, variant }) => {
    if (!active) return '#dee2e6';
    if (variant === 'not_done') return '#e63946';
    if (variant === 'in_progress') return '#f4a261';
    return '#2dc653';
  }};
  background-color: ${({ active, variant }) => {
    if (!active) return '#ffffff';
    if (variant === 'not_done') return '#ffd8d8';
    if (variant === 'in_progress') return '#fff3bf';
    return '#d3f9d8';
  }};
`;

export const StatusButtonText = styled.Text<{ active: boolean; variant: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ active, variant }) => {
    if (!active) return '#adb5bd';
    if (variant === 'not_done') return '#c0392b';
    if (variant === 'in_progress') return '#856404';
    return '#1e7e34';
  }};
`;
