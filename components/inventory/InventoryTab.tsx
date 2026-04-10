import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export type TabType = 'All' | 'Sold' | 'For Sale';

export const TAB_OPTIONS: TabType[] = ['All', 'Sold', 'For Sale'];

interface InventoryTabProps {
  tab: TabType;
  isActive: boolean;
  onPress: (tab: TabType) => void;
}

export const InventoryTab = memo(({ tab, isActive, onPress }: InventoryTabProps) => {
  const handlePress = useCallback(() => {
    onPress(tab);
  }, [onPress, tab]);

  return (
    <Pressable
      style={[styles.tab, isActive && styles.tabActive]}
      onPress={handlePress}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {tab}
      </Text>
    </Pressable>
  );
});
InventoryTab.displayName = 'InventoryTab';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  tabActive: {
    backgroundColor: '#2492D4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555555',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});