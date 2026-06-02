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
import { DUMMY_ISSUES } from '../data/dummyIssues';
import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_MARKER_COLORS,
  STATUS_LABELS,
} from '../utils/issueHelpers';
import {
  ScreenContainer,
  MapWrapper,
  HeaderOverlay,
  HeaderTitle,
  HeaderHint,
  PinFab,
  PinFabText,
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

// Local in-memory store 
let localIssues: Issue[] = [...DUMMY_ISSUES];

export default function ReportMapScreen() {
  const mapRef = useRef<MapView>(null);

  // Map state
  const [mapReady, setMapReady] = useState(false);
  const [allIssues, setAllIssues] = useState<Issue[]>(localIssues);
  const [pendingPin, setPendingPin] = useState<PendingPin | null>(null);

  // Form state
  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<IssueCategory>('Pothole');
  const [formImageUri, setFormImageUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Map handlers 
  const handleLongPress = (e: LongPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPendingPin({ latitude, longitude });
    resetForm();
    setFormVisible(true);
  };

  const handleDismiss = () => {
    setFormVisible(false);
    setPendingPin(null);
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

  const handleSubmit = () => {
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
        address: `${pendingPin.latitude.toFixed(4)}, ${pendingPin.longitude.toFixed(4)}`,
      },
      createdAt: new Date().toISOString(),
    };

    localIssues = [newIssue, ...localIssues];
    setAllIssues([...localIssues]);
    setSubmitting(false);
    setFormVisible(false);
    setPendingPin(null);
    resetForm();

    Alert.alert('Issue Reported', `"${newIssue.title}" has been pinned on the map.`);
  };

  return (
    <ScreenContainer>
      <MapWrapper>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsCompass
          onMapReady={() => setMapReady(true)}
          onLongPress={handleLongPress}
        >
          {/* Existing issues */}
          {allIssues.map((issue) => (
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
            <MarkerCountText>{allIssues.length} issues pinned</MarkerCountText>
          </MarkerCountBadge>
        )}
      </MapWrapper>

      {/* Report Form Modal  */}
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
              <TouchableWithoutFeedback onPress={() => {}}>
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

                    {/* Location */}
                    <FormLabel>Location</FormLabel>
                    <LocationRow>
                      <Ionicons name="location-outline" size={16} color="#4361EE" />
                      <LocationText numberOfLines={1}>
                        {pendingPin
                          ? `${pendingPin.latitude.toFixed(5)}, ${pendingPin.longitude.toFixed(5)}`
                          : 'No pin placed'}
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
