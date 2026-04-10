import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WizardStep = 'options' | 'ask_remove_bg' | 'ask_add_bg' | 'select_bg';

interface MediaUploadWizardProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (imageUri: string) => void;
}

const MOCK_BACKGROUNDS = [
  '#FF5733', '#33FF57', '#3357FF', '#F333FF',
  '#33FFF3', '#F3FF33', '#000000', '#FFFFFF',
  '#888888', '#FF8800', '#0088FF', '#8800FF'
];

export const MediaUploadWizard = ({ visible, onClose, onComplete }: MediaUploadWizardProps) => {
  const [step, setStep] = useState<WizardStep>('options');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const resetAndClose = () => {
    setStep('options');
    setCapturedImage(null);
    onClose();
  };

  const handleLaunchCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // This brings up the native "Retake / Use Photo" screen
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCapturedImage(result.assets[0].uri);
      setStep('ask_remove_bg');
    } else {
      resetAndClose();
    }
  };

  const handleLaunchLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCapturedImage(result.assets[0].uri);
      setStep('ask_remove_bg');
    } else {
      resetAndClose();
    }
  };

  const handleRemoveBgYes = () => {
    setStep('ask_add_bg');
  };

  const handleRemoveBgNo = () => {
    if (capturedImage) {
      onComplete(capturedImage);
    }
    resetAndClose();
  };

  const handleAddBgYes = () => {
    setStep('select_bg');
  };

  const handleAddBgNo = () => {
    if (capturedImage) {
      onComplete(capturedImage);
    }
    resetAndClose();
  };

  const handleSelectBackground = (bgUrl: string) => {
    // In a real app, this would composite the background and the image
    if (capturedImage) {
      onComplete(capturedImage); // Simulating success with the original image
    }
    resetAndClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={resetAndClose}>
      <View style={styles.overlay}>
        {step === 'options' && (
          <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Upload Media</Text>
              <Pressable onPress={resetAndClose} style={styles.closeButton}>
                <X size={20} color="#555" />
              </Pressable>
            </View>
            <View style={styles.optionsContainer}>
              <Pressable style={styles.optionButton} onPress={handleLaunchCamera}>
                <View style={styles.optionIconContainer}>
                  <Camera size={24} color="#1C9EF4" />
                </View>
                <Text style={styles.optionText}>Open Camera</Text>
              </Pressable>
              <Pressable style={styles.optionButton} onPress={handleLaunchLibrary}>
                <View style={styles.optionIconContainer}>
                  <ImageIcon size={24} color="#1C9EF4" />
                </View>
                <Text style={styles.optionText}>Upload Media</Text>
              </Pressable>
            </View>
          </View>
        )}

        {step === 'ask_remove_bg' && (
          <View style={styles.centerModal}>
            <Text style={styles.modalTitle}>Do you want to remove the background?</Text>
            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={styles.previewImage} />
            )}
            <View style={styles.modalActions}>
              <Pressable style={[styles.actionBtn, styles.actionBtnOutline]} onPress={handleRemoveBgNo}>
                <Text style={styles.actionBtnOutlineText}>NO</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.actionBtnPrimary]} onPress={handleRemoveBgYes}>
                <Text style={styles.actionBtnPrimaryText}>YES</Text>
              </Pressable>
            </View>
          </View>
        )}

        {step === 'ask_add_bg' && (
          <View style={styles.centerModal}>
            <Text style={styles.modalTitle}>Do you want to add background from existing backgrounds gallery?</Text>
            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={styles.previewImage} />
            )}
            <View style={styles.modalActions}>
              <Pressable style={[styles.actionBtn, styles.actionBtnOutline]} onPress={handleAddBgNo}>
                <Text style={styles.actionBtnOutlineText}>NO</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.actionBtnPrimary]} onPress={handleAddBgYes}>
                <Text style={styles.actionBtnPrimaryText}>YES</Text>
              </Pressable>
            </View>
          </View>
        )}

        {step === 'select_bg' && (
          <View style={[styles.bottomSheet, { height: '70%', paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Background</Text>
              <Pressable onPress={resetAndClose} style={styles.closeButton}>
                <X size={20} color="#555" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.bgGrid}>
              {MOCK_BACKGROUNDS.map((bg, idx) => (
                <Pressable
                  key={idx}
                  style={[styles.bgThumbnail, { backgroundColor: bg }]}
                  onPress={() => handleSelectBackground(bg)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  closeButton: {
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    alignItems: 'center',
    gap: 8,
  },
  optionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  centerModal: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#EAEAEA',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnOutline: {
    borderWidth: 1,
    borderColor: '#1C9EF4',
  },
  actionBtnOutlineText: {
    color: '#1C9EF4',
    fontSize: 16,
    fontWeight: '600',
  },
  actionBtnPrimary: {
    backgroundColor: '#1C9EF4',
  },
  actionBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bgGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  bgThumbnail: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});