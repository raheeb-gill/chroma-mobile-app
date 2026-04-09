import React, { memo, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { Menu, Bell, ChevronDown, Car, Search, SlidersHorizontal, X, Calendar as CalendarIcon } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Vehicle, mockVehicles } from '@/constants/mock-data';
import type { ListRenderItemInfo } from '@shopify/flash-list';

const nalleyLogo = require('@/assets/images/react-logo.png');

type TabType = 'All' | 'Sold' | 'For Sale';

const TAB_OPTIONS: TabType[] = ['All', 'Sold', 'For Sale'];
const VEHICLE_LIST_DRAW_DISTANCE = 320;
const VEHICLE_ITEM_TYPE = 'vehicle';

interface InventoryTabProps {
  tab: TabType;
  isActive: boolean;
  onPress: (tab: TabType) => void;
}

const InventoryTab = memo(({ tab, isActive, onPress }: InventoryTabProps) => {
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

const VehicleCard = memo(({ item }: { item: Vehicle }) => {
  return (
    <View style={styles.vehicleCard}>
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
    </View>
  );
});
VehicleCard.displayName = 'VehicleCard';

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const normalizedSearchQuery = useMemo(() => {
    return deferredSearchQuery.trim().toLowerCase();
  }, [deferredSearchQuery]);

  const filteredVehicles = useMemo(() => {
    if (!normalizedSearchQuery && activeTab === 'All') {
      return mockVehicles;
    }

    return mockVehicles.filter((v) => {
      const matchesSearch =
        !normalizedSearchQuery || v.name.toLowerCase().includes(normalizedSearchQuery);
      const matchesTab = activeTab === 'All' || v.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [normalizedSearchQuery, activeTab]);

  const modalFooterInsetStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 20 };
  }, [insets.bottom]);

  const listOverrideProps = useMemo(() => {
    return { initialDrawBatchSize: 6 };
  }, []);

  const handleOpenFilters = useCallback(() => {
    setFilterModalVisible(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setFilterModalVisible(false);
  }, []);

  const handleSelectTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const getItemType = useCallback(() => {
    return VEHICLE_ITEM_TYPE;
  }, []);

  const keyExtractor = useCallback((item: Vehicle) => {
    return item.id;
  }, []);

  const renderVehicleItem = useCallback(({ item }: ListRenderItemInfo<Vehicle>) => {
    return <VehicleCard item={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.topNav}>
          <Pressable style={styles.iconButton}>
            <Menu color="#FFFFFF" size={24} />
          </Pressable>

          <View style={styles.rightNav}>
            <Pressable style={styles.dealerSelector}>
              <Text style={styles.dealerSelectorText}>Demo Dealer 1</Text>
              <ChevronDown color="#FFFFFF" size={16} style={styles.dealerChevron} />
            </Pressable>
            
            <Pressable style={styles.notificationButton}>
              <Bell color="#FFFFFF" size={20} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.screenTitle}>Inventory</Text>
          <Text style={styles.screenSubtitle}>Manage all dealer&apos;s inventory</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.mainDealerCard}>
            <View style={styles.mainDealerRow}>
              <View style={styles.dealerLogoBox}>
                <Image source={nalleyLogo} style={styles.dealerLogo} contentFit="contain" />
              </View>
              <View style={styles.dealerInfo}>
                <Text style={styles.dealerName}>Nalley Honda</Text>
                <View style={styles.dealerMetaRow}>
                  <Car size={14} color="#777777" />
                  <Text style={styles.dealerMetaText}>156 vehicles</Text>
                </View>
              </View>
              <ChevronDown color="#1C9EF4" size={24} />
            </View>
          </View>

          <View style={styles.searchAndFilterRow}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#999999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by keyword"
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
            </View>
            <Pressable style={styles.filterButton} onPress={handleOpenFilters}>
              <SlidersHorizontal size={20} color="#555555" />
            </Pressable>
          </View>

          <View style={styles.tabsContainer}>
            {TAB_OPTIONS.map((tab) => (
              <InventoryTab
                key={tab}
                tab={tab}
                isActive={activeTab === tab}
                onPress={handleSelectTab}
              />
            ))}
          </View>

          <View style={styles.listContainer}>
            <FlashList
              data={filteredVehicles}
              renderItem={renderVehicleItem}
              keyExtractor={keyExtractor}
              getItemType={getItemType}
              drawDistance={VEHICLE_LIST_DRAW_DISTANCE}
              overrideProps={listOverrideProps}
              removeClippedSubviews
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseFilters}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <Pressable
                style={styles.modalCloseButton}
                onPress={handleCloseFilters}
              >
                <X size={16} color="#999999" />
              </Pressable>
            </View>

            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Category</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Year</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Make</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Model</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Date Range</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <CalendarIcon size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Include</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Age</Text>
                <Pressable style={styles.dropdownButton}>
                  <Text style={styles.dropdownPlaceholder}>--Select--</Text>
                  <ChevronDown size={20} color="#555555" />
                </Pressable>
              </View>
            </ScrollView>

            <View style={[styles.modalFooter, modalFooterInsetStyle]}>
              <Pressable
                style={styles.applyButton}
                onPress={handleCloseFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: '#1C9EF4',
  },
  safeArea: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 4,
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dealerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dealerSelectorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  dealerChevron: {
    marginLeft: 2,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#1C9EF4',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  mainDealerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  mainDealerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealerLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dealerLogo: {
    width: 32,
    height: 32,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  dealerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealerMetaText: {
    fontSize: 14,
    color: '#777777',
  },
  searchAndFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    height: '100%',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 4,
  },
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
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

  // Filter Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
    paddingTop: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyButton: {
    height: 48,
    backgroundColor: '#2492D4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
