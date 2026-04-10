import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mockVehicles } from '@/constants/mock-data';
import { getVehicleDetailSectionLabel } from '@/constants/VEHICLE_DETAIL_SECTIONS';
import { VehicleDetailSectionContent } from '@/components/vehicleDetails/VehicleDetailSectionContent';

export default function VehicleDetailSectionScreen() {
  const { section: sectionParam, vehicleId: vehicleIdParam } = useLocalSearchParams<{
    section?: string | string[];
    vehicleId?: string | string[];
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Add a ref to track if the keyboard is currently animating or shown
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const section = useMemo(() => {
    return Array.isArray(sectionParam) ? sectionParam[0] : sectionParam;
  }, [sectionParam]);

  const vehicleId = useMemo(() => {
    return Array.isArray(vehicleIdParam) ? vehicleIdParam[0] : vehicleIdParam;
  }, [vehicleIdParam]);

  const vehicle = useMemo(() => {
    return mockVehicles.find((item) => item.id === vehicleId) ?? mockVehicles[0];
  }, [vehicleId]);

  const title = useMemo(() => {
    return getVehicleDetailSectionLabel(section ?? '');
  }, [section]);

  const isKeyboardVisible = keyboardHeight > 0;

  useEffect(() => {
    // Listen to frame events to get exact keyboard height
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const contentInsetStyle = useMemo(() => {
    // The ultimate fix for forms: don't use KeyboardAvoidingView for the whole screen
    // Instead, pad the bottom of the ScrollView by the exact height of the keyboard
    // This allows natural scrolling all the way down, without weird layout shifts
    return { paddingBottom: isKeyboardVisible ? keyboardHeight + 80 : insets.bottom + 90 };
  }, [insets.bottom, isKeyboardVisible, keyboardHeight]);

  const footerInsetStyle = useMemo(() => {
    // Push the footer up precisely by the keyboard height
    return { paddingBottom: isKeyboardVisible ? keyboardHeight + 12 : insets.bottom + 16 };
  }, [insets.bottom, isKeyboardVisible, keyboardHeight]);

  const headerStyle = useMemo(() => {
    return {
      height: 60 + insets.top,
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const handleBack = useCallback(() => {
    Keyboard.dismiss();
    router.back();
  }, [router]);

  const handleInputFocus = useCallback((node: any) => {
    if (scrollViewRef.current && node) {
      setTimeout(() => {
        // Find the node relative to the ScrollView, and explicitly ask the ScrollView 
        // to scroll so that this node is visible.
        // `scrollToFocusedInput` is provided natively by TextInput.State or we can use ScrollView's scrollResponderScrollNativeHandleToKeyboard
        const scrollResponder = scrollViewRef.current?.getScrollResponder();
        if (scrollResponder) {
          // This built-in React Native method calculates exactly where the input is 
          // and scrolls the view just enough to put the input above the keyboard
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            node,
            120, // additional offset/padding above the keyboard
            true // animated
          );
        }
      }, 300);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" backgroundColor="#2492D4" />
      <View style={[styles.header, headerStyle]}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={[styles.contentContainer, contentInsetStyle]} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <VehicleDetailSectionContent 
          section={section} 
          title={title} 
          vehicle={vehicle} 
          onInputFocus={handleInputFocus}
        />
      </ScrollView>

      <View style={[styles.footer, footerInsetStyle]}>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FB' },
  header: { backgroundColor: '#2492D4', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  headerSpacer: { width: 28, height: 28 },
  contentContainer: { paddingHorizontal: 12, paddingTop: 12 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 12, paddingTop: 12, backgroundColor: '#F7F8FB' },
  saveButton: { height: 44, borderRadius: 10, backgroundColor: '#2492D4', alignItems: 'center', justifyContent: 'center' },
  saveButtonText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
});
