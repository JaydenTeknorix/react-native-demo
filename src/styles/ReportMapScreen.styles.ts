import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f4f6fb;
`;

export const MapWrapper = styled.View`
  flex: 1;
`;

export const HeaderOverlay = styled.View`
  padding: 16px 20px 12px;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
`;

export const HeaderHint = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
`;

export const PinFab = styled.View`
  position: absolute;
  bottom: 32px;
  align-self: center;
  flex-direction: row;
  align-items: center;
  background-color: #4361ee;
  border-radius: 999px;
  padding: 14px 24px;
  gap: 8px;
  shadow-color: #4361ee;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.35;
  shadow-radius: 8px;
  elevation: 6;
`;

export const PinFabText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
`;

// ── Report form modal sheet ───────────────────────────────────────
export const ModalBackdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
`;

export const Sheet = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 8px 20px 32px;
  max-height: 90%;
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
  margin-bottom: 16px;
`;

export const FormLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #adb5bd;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 6px;
  margin-top: 14px;
`;

export const TextInput = styled.TextInput`
  background-color: #f4f6fb;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  color: #1a1a2e;
  border-width: 1px;
  border-color: #e9ecef;
`;

export const TextAreaInput = styled.TextInput`
  background-color: #f4f6fb;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  color: #1a1a2e;
  border-width: 1px;
  border-color: #e9ecef;
  min-height: 80px;
  text-align-vertical: top;
`;

export const CategoryRow = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { gap: 8 },
}))``;

export const CategoryChip = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  background-color: ${({ active }) => (active ? '#4361EE' : '#f4f6fb')};
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#4361EE' : '#dee2e6')};
`;

export const CategoryChipText = styled.Text<{ active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#6c757d')};
`;

export const ImagePickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f4f6fb;
  border-radius: 10px;
  border-width: 1px;
  border-color: #e9ecef;
  border-style: dashed;
  padding: 16px;
  gap: 10px;
`;

export const ImagePickerText = styled.Text`
  font-size: 14px;
  color: #6c757d;
`;

export const PreviewImage = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  margin-top: 8px;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f4f6fb;
  border-radius: 10px;
  padding: 12px 14px;
  gap: 8px;
  border-width: 1px;
  border-color: #e9ecef;
`;

export const LocationText = styled.Text`
  font-size: 13px;
  color: #6c757d;
  flex: 1;
`;

export const SubmitButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#adb5bd' : '#4361ee')};
  border-radius: 12px;
  padding: 15px;
  align-items: center;
  margin-top: 20px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
`;

export const MarkerCountBadge = styled.View`
  position: absolute;
  top: 80px;
  right: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export const MarkerCountText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
`;
