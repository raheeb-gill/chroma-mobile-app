import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Camera } from 'lucide-react-native';
import type { Vehicle } from '@/constants/mock-data';
import { MediaUploadWizard } from './MediaUploadWizard';

export const SELECTED_MEDIA_INDEXES = [2, 3];

interface ProductMediaSectionProps {
  vehicle: Vehicle;
  mediaItems: number[];
  onAddMedia?: (uri: string) => void;
}

export const ProductMediaSection = ({
  vehicle,
  mediaItems,
  onAddMedia,
}: ProductMediaSectionProps) => {
  const [isWizardVisible, setIsWizardVisible] = useState(false);

  const handleUploadComplete = (uri: string) => {
    if (onAddMedia) {
      onAddMedia(uri);
    }
  };

  return (
    <View style={styles.stack}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeading}>Product Media</Text>
        <View style={styles.divider} />
      </View>
      
      <Pressable style={styles.uploadBox} onPress={() => setIsWizardVisible(true)}>
        <Camera size={24} color="#B8B8B8" />
        <Text style={styles.uploadText}>Upload Media</Text>
      </Pressable>

      <View style={styles.mediaHeaderRow}>
        <Text style={styles.mediaHeaderLabel}>Media</Text>
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Select All</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Delete Selected</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.mediaGrid}>
        {mediaItems.map((item) => (
          <Pressable key={`media-${item}`} style={styles.mediaCard}>
            <Image
              source={typeof item === 'string' ? { uri: item } : vehicle.image}
              style={styles.mediaThumb}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
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

      <MediaUploadWizard 
        visible={isWizardVisible} 
        onClose={() => setIsWizardVisible(false)} 
        onComplete={handleUploadComplete} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  headerContainer: { gap: 12, marginBottom: 4 },
  sectionHeading: { fontSize: 10, fontWeight: '500', color: '#555555' },
  divider: { height: 1, backgroundColor: '#E8E8E8' },
  uploadBox: { height: 160, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 },
  uploadText: { fontSize: 10, fontWeight: '500', color: '#555555' },
  mediaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  mediaHeaderLabel: { fontSize: 10, fontWeight: '500', color: '#555555' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  actionButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
  actionButtonText: { fontSize: 10, fontWeight: '500', color: '#333333' },
  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  mediaCard: { width: '48.3%', borderRadius: 10, overflow: 'hidden', position: 'relative' },
  mediaThumb: { width: '100%', aspectRatio: 1.1, borderRadius: 10, backgroundColor: '#DDDDDD' },
  primaryBadge: { position: 'absolute', left: 8, bottom: 8, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.55)', paddingHorizontal: 8, paddingVertical: 3 },
  primaryBadgeText: { fontSize: 8, fontWeight: '600', color: '#FFFFFF' },
  selectedBadge: { position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderRadius: 4, backgroundColor: '#2492D4', borderWidth: 1.5, borderColor: '#FFFFFF' },
});