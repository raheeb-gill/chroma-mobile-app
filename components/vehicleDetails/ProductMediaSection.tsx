import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { CloudUpload } from 'lucide-react-native';
import type { Vehicle } from '@/constants/mock-data';

export type MediaTab = 'Media' | 'Social' | 'Dealer Selected';
export const MEDIA_TABS: MediaTab[] = ['Media', 'Social', 'Dealer Selected'];
export const SELECTED_MEDIA_INDEXES = [2, 3];

interface ProductMediaSectionProps {
  vehicle: Vehicle;
  activeMediaTab: MediaTab;
  setActiveMediaTab: (tab: MediaTab) => void;
  mediaItems: number[];
}

export const ProductMediaSection = ({
  vehicle,
  activeMediaTab,
  setActiveMediaTab,
  mediaItems,
}: ProductMediaSectionProps) => {
  return (
    <View style={styles.stack}>
      <Text style={styles.sectionHeading}>Product Media</Text>
      <Pressable style={styles.uploadBox}>
        <CloudUpload size={18} color="#B8B8B8" />
        <Text style={styles.uploadText}>Upload Media</Text>
      </Pressable>
      <View style={styles.mediaHeader}>
        <Text style={styles.mediaHeaderLabel}>Media</Text>
        <View style={styles.mediaTabs}>
          {MEDIA_TABS.map((tab) => (
            <Pressable
              key={tab}
              style={styles.mediaTab}
              onPress={() => setActiveMediaTab(tab)}
            >
              <Text style={[styles.mediaTabText, activeMediaTab === tab && styles.mediaTabTextActive]}>
                {tab}
              </Text>
              {activeMediaTab === tab ? <View style={styles.mediaTabUnderline} /> : null}
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.mediaGrid}>
        {mediaItems.map((item) => (
          <Pressable key={`${activeMediaTab}-${item}`} style={styles.mediaCard}>
            <Image
              source={vehicle.image}
              style={styles.mediaThumb}
              contentFit="cover"
              cachePolicy="memory-disk"
              recyclingKey={`${vehicle.id}-${activeMediaTab}-${item}`}
              transition={0}
            />
            {item === 0 ? (
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryBadgeText}>Primary</Text>
              </View>
            ) : null}
            {SELECTED_MEDIA_INDEXES.includes(item) ? <View style={styles.selectedBadge} /> : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 10, fontWeight: '500', color: '#555555' },
  uploadBox: { height: 118, borderRadius: 8, backgroundColor: '#ECECEC', alignItems: 'center', justifyContent: 'center', gap: 8 },
  uploadText: { fontSize: 8, fontWeight: '500', color: '#8A8A8A' },
  mediaHeader: { gap: 6 },
  mediaHeaderLabel: { fontSize: 10, fontWeight: '500', color: '#555555' },
  mediaTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  mediaTab: { flex: 1, height: 28, alignItems: 'center', justifyContent: 'center' },
  mediaTabText: { fontSize: 8, fontWeight: '500', color: '#7C7C7C' },
  mediaTabTextActive: { color: '#2492D4' },
  mediaTabUnderline: { position: 'absolute', bottom: -1, width: 40, height: 1.5, backgroundColor: '#2492D4' },
  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  mediaCard: { width: '48.3%', borderRadius: 10, overflow: 'hidden', position: 'relative' },
  mediaThumb: { width: '100%', aspectRatio: 1.1, borderRadius: 10, backgroundColor: '#DDDDDD' },
  primaryBadge: { position: 'absolute', left: 8, bottom: 8, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.55)', paddingHorizontal: 8, paddingVertical: 3 },
  primaryBadgeText: { fontSize: 8, fontWeight: '600', color: '#FFFFFF' },
  selectedBadge: { position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderRadius: 4, backgroundColor: '#2492D4', borderWidth: 1.5, borderColor: '#FFFFFF' },
});