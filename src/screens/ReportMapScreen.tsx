import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, {
  LongPressEvent,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TabBar from '../components/TabBar';

import { Issue, IssueCategory } from '../types/issue';
import { useIssues } from '../store/issuesStore';
import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_MARKER_COLORS,
} from '../utils/issueHelpers';
import {
  ScreenContainer,
  MapWrapper,
  HeaderOverlay,
  HeaderTitle,
  HeaderHint,
  ModalBackdrop,
  Sheet,
  SheetHandle,
  SheetTitle,
  FormLabel,
  TextInput,
  TextAreaInput,
  CategoryRow,
  CategoryChip,
  CategoryChipText,
  ImagePickerButton,
  ImagePickerText,
  PreviewImage,
  LocationRow,
  LocationText,
  SubmitButton,
  SubmitButtonText,
  MarkerCountBadge,
  MarkerCountText,
} from '../styles/ReportMapScreen.styles';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBjZM2A2g7EnKcPRazxY-IMcXopFOqtJmA';

const INITIAL_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

interface PendingPin {
  latitude: number;
  longitude: number;
}

// Reverse Geo-coding 
async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];

      // Prefer a named establishment or point of interest first
      const poi = data.results.find((r: any) =>
        r.types.includes('establishment') || r.types.includes('point_of_interest')
      );
      if (poi) return poi.formatted_address;

      // Fall back to the top result's formatted address
      return result.formatted_address;
    }
  } catch (e) {
    console.warn('Reverse geocode failed:', e);
  }

  // Last resort: raw coordinates
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

export default function ReportMapScreen() {
  const mapRef = useRef<MapView>(null);
  const { issues, createIssue } = useIssues();

  // Map state
  const [mapReady, setMapReady] = useState(false);
  const [pendingPin, setPendingPin] = useState<PendingPin | null>(null);

  // store resolved place name separately
  const [pendingAddress, setPendingAddress] = useState<string>('Resolving location…');

  // Form state
  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<IssueCategory>('Pothole');
  const [formImageUri, setFormImageUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Map handlers
  const handleLongPress = async (e: LongPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPendingPin({ latitude, longitude });
    resetForm();

    // Show the sheet immediately, then resolve the name in the background
    setPendingAddress('Resolving location…');
    setFormVisible(true);

    const placeName = await reverseGeocode(latitude, longitude);
    setPendingAddress(placeName);
  };

  const handleDismiss = () => {
    setFormVisible(false);
    setPendingPin(null);
    setPendingAddress('Resolving location…');
  };

  // Image picker
  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Gallery access is needed to attach a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFormImageUri(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera access is needed to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFormImageUri(result.assets[0].uri);
    }
  };

  const handlePickImage = () => {
    Alert.alert('Attach Photo', 'Choose photo source', [
      { text: 'Take photo', onPress: handleTakePhoto },
      { text: 'Choose from gallery', onPress: handlePickFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Form helpers
  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Pothole');
    setFormImageUri(null);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim()) {
      Alert.alert('Title Required', 'Please enter a title for the issue.');
      return;
    }
    if (!pendingPin) return;

    setSubmitting(true);

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: formTitle.trim(),
      description: formDescription.trim(),
      category: formCategory,
      status: 'not_done',
      imageUri: formImageUri,
      location: {
        latitude: pendingPin.latitude,
        longitude: pendingPin.longitude,
        // Use resolved place name instead of raw coords
        address: pendingAddress,
      },
      createdAt: new Date().toISOString(),
    };

    await createIssue(newIssue);

    setSubmitting(false);
    setFormVisible(false);
    setPendingPin(null);
    setPendingAddress('Resolving location…');
    resetForm();

    Alert.alert('Issue Reported', `"${newIssue.title}" has been pinned on the map.`);
  };

  return (
    <ScreenContainer>
      <MapWrapper>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsCompass
          onMapReady={() => setMapReady(true)}
          onLongPress={handleLongPress}
        >
          {/* All persisted issues */}
          {issues.map((issue) => (
            <Marker
              key={issue.id}
              coordinate={{
                latitude: issue.location.latitude,
                longitude: issue.location.longitude,
              }}
              title={issue.title}
              description={issue.category}
              pinColor={CATEGORY_MARKER_COLORS[issue.category]}
            />
          ))}

          {/* Pending (unsaved) pin */}
          {pendingPin && (
            <Marker
              coordinate={pendingPin}
              pinColor="#4361EE"
              title="New Issue"
              description="Tap Save to report"
            />
          )}
        </MapView>

        {/* Header overlay */}
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
          }}
        >
          <HeaderOverlay>
            <HeaderTitle>Report an Issue</HeaderTitle>
            <HeaderHint>Long-press on the map to drop a pin</HeaderHint>
          </HeaderOverlay>
        </SafeAreaView>

        {/* Issues count badge */}
        {mapReady && (
          <MarkerCountBadge>
            <MarkerCountText>{issues.length} issues pinned</MarkerCountText>
          </MarkerCountBadge>
        )}
      </MapWrapper>

      {/* Report Form Modal */}
      <Modal
        visible={formVisible}
        transparent
        animationType="slide"
        onRequestClose={handleDismiss}
      >
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <ModalBackdrop>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={0}
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <TouchableWithoutFeedback onPress={() => { }}>
                <Sheet>
                  <SheetHandle />
                  <SheetTitle>New Issue Report</SheetTitle>

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {/* Title */}
                    <FormLabel>Issue Title *</FormLabel>
                    <TextInput
                      placeholder="e.g. Broken streetlight on Oak Ave"
                      placeholderTextColor="#adb5bd"
                      value={formTitle}
                      onChangeText={setFormTitle}
                      returnKeyType="next"
                    />

                    {/* Description */}
                    <FormLabel>Description</FormLabel>
                    <TextAreaInput
                      placeholder="Describe the issue in detail…"
                      placeholderTextColor="#adb5bd"
                      value={formDescription}
                      onChangeText={setFormDescription}
                      multiline
                      numberOfLines={3}
                    />

                    {/* Category */}
                    <FormLabel>Category</FormLabel>
                    <CategoryRow>
                      {CATEGORIES.map((cat) => (
                        <CategoryChip
                          key={cat}
                          active={formCategory === cat}
                          onPress={() => setFormCategory(cat)}
                        >
                          <CategoryChipText active={formCategory === cat}>{cat}</CategoryChipText>
                        </CategoryChip>
                      ))}
                    </CategoryRow>

                    {/* Location — now shows place name, not coords */}
                    <FormLabel>Location</FormLabel>
                    <LocationRow>
                      <Ionicons name="location-outline" size={16} color="#4361EE" />
                      <LocationText numberOfLines={2}>
                        {pendingPin ? pendingAddress : 'No pin placed'}
                      </LocationText>
                    </LocationRow>

                    {/* Image */}
                    <FormLabel>Photo</FormLabel>
                    {formImageUri ? (
                      <>
                        <PreviewImage source={{ uri: formImageUri }} resizeMode="cover" />
                        <ImagePickerButton
                          onPress={() => setFormImageUri(null)}
                          style={{ marginTop: 8 }}
                        >
                          <Ionicons name="trash-outline" size={18} color="#e63946" />
                          <ImagePickerText style={{ color: '#e63946' }}>
                            Remove photo
                          </ImagePickerText>
                        </ImagePickerButton>
                      </>
                    ) : (
                      <ImagePickerButton onPress={handlePickImage}>
                        <Ionicons name="image-outline" size={20} color="#6c757d" />
                        <ImagePickerText>Add photo</ImagePickerText>
                      </ImagePickerButton>
                    )}

                    {/* Submit */}
                    <SubmitButton onPress={handleSubmit} disabled={submitting} activeOpacity={0.85}>
                      <SubmitButtonText>
                        {submitting ? 'Saving…' : 'Save Issue'}
                      </SubmitButtonText>
                    </SubmitButton>
                  </ScrollView>
                </Sheet>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </ModalBackdrop>
        </TouchableWithoutFeedback>
      </Modal>

      <TabBar />
    </ScreenContainer>
  );
}