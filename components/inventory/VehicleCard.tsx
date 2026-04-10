import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Vehicle } from '@/constants/mock-data';

interface VehicleCardProps {
  item: Vehicle;
  onPress: (vehicleId: string) => void;
}

export const VehicleCard = memo(({ item, onPress }: VehicleCardProps) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  return (
    <Pressable style={styles.vehicleCard} onPress={handlePress}>
      <View style={styles.vehicleImageContainer}>
        <Image
          source={item.image}
          style={styles.vehicleImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          recyclingKey={item.id}
          transition={0}
        />
        <View style={styles.vehicleStatusBadge}>
          <Text style={styles.vehicleStatusText}>{item.status}</Text>
        </View>
        <View style={styles.imageDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleHeaderRow}>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <Text style={styles.vehiclePrice}>{item.price}</Text>
        </View>
        <Text style={styles.vehicleDescription}>{item.description}</Text>
        <Text style={styles.vehicleMileage}>{item.mileage}</Text>
      </View>
    </Pressable>
  );
});
VehicleCard.displayName = 'VehicleCard';

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    overflow: 'hidden',
  },
  vehicleImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  vehicleStatusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  vehicleStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  imageDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  vehicleInfo: {
    padding: 16,
  },
  vehicleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2492D4',
  },
  vehicleDescription: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 4,
  },
  vehicleMileage: {
    fontSize: 14,
    color: '#999999',
  },
});