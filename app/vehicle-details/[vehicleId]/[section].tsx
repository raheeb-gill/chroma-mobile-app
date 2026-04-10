import React, { useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

  const contentInsetStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 96 };
  }, [insets.bottom]);

  const footerInsetStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 16 };
  }, [insets.bottom]);

  const headerStyle = useMemo(() => {
    return {
      height: 60 + insets.top,
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

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

      <ScrollView contentContainerStyle={[styles.contentContainer, contentInsetStyle]} showsVerticalScrollIndicator={false}>
        <VehicleDetailSectionContent section={section} title={title} vehicle={vehicle} />
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
