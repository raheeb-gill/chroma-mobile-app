import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mockVehicles } from '@/constants/mock-data';
import { VEHICLE_DETAIL_SECTIONS, type VehicleDetailSectionSlug } from '@/constants/VEHICLE_DETAIL_SECTIONS';

interface DetailRowProps {
  label: string;
  onPress: () => void;
}

const DetailRow = memo(({ label, onPress }: DetailRowProps) => {
  return (
    <Pressable
      style={styles.detailRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.detailRowText}>{label}</Text>
      <View style={styles.detailRowIcon}>
        <ArrowRight size={16} color="#2492D4" />
      </View>
    </Pressable>
  );
});
DetailRow.displayName = 'DetailRow';

export default function VehicleDetailsScreen() {
  const { vehicleId: vehicleIdParam } = useLocalSearchParams<{ vehicleId?: string | string[] }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const vehicleId = useMemo(() => {
    return Array.isArray(vehicleIdParam) ? vehicleIdParam[0] : vehicleIdParam;
  }, [vehicleIdParam]);

  const vehicle = useMemo(() => {
    return mockVehicles.find((item) => item.id === vehicleId) ?? mockVehicles[0];
  }, [vehicleId]);

  const contentInsetStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 108 };
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

  const handleOpenSection = useCallback((section: VehicleDetailSectionSlug) => {
    if (!vehicleId) {
      return;
    }

    router.push({
      pathname: '/vehicle-details/[vehicleId]/[section]',
      params: { vehicleId, section },
    });
  }, [router, vehicleId]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" backgroundColor="#2492D4" />
      <View style={[styles.header, headerStyle]}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeft size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Vehicle Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, contentInsetStyle]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Image
            source={vehicle.image}
            style={styles.heroImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
          />
        </View>

        <View style={styles.paginationDots}>
          <View style={[styles.paginationDot, styles.paginationDotActive]} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleStatus}>{vehicle.status}</Text>
          </View>
          <Text style={styles.vehicleMeta}>{vehicle.description}</Text>
          <View style={styles.summaryFooter}>
            <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            <Text style={styles.vehicleMileage}>{vehicle.mileage}</Text>
          </View>
        </View>

        <View style={styles.sectionList}>
          {VEHICLE_DETAIL_SECTIONS.map((section) => (
            <DetailRow
              key={section.slug}
              label={section.label}
              onPress={() => handleOpenSection(section.slug)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, footerInsetStyle]}>
        <Pressable
          style={styles.saveButton}
          accessibilityRole="button"
          accessibilityLabel="Save vehicle details"
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header: {
    backgroundColor: '#2492D4',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 28,
    height: 28,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  heroCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 14,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CFCFCF',
  },
  paginationDotActive: {
    width: 14,
    backgroundColor: '#1E1E1E',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    gap: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  vehicleName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  vehicleStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2492D4',
  },
  vehicleMeta: {
    fontSize: 13,
    color: '#666666',
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  vehicleMileage: {
    fontSize: 13,
    fontWeight: '500',
    color: '#777777',
  },
  sectionList: {
    gap: 10,
  },
  detailRow: {
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailRowText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    paddingVertical: 12,
  },
  detailRowIcon: {
    marginLeft: 12,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#F6F8FB',
  },
  saveButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#2492D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
