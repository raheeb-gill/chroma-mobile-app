import React, { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { Menu, Bell, ChevronDown, Car, Search, SlidersHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Vehicle, mockSubDealers, mockVehicles } from '@/constants/mock-data';
import type { ListRenderItemInfo } from '@shopify/flash-list';

import { InventoryTab, VehicleCard, FilterModal, DealerModal, TAB_OPTIONS, TabType } from '@/components/inventory';

const nalleyLogo = require('@/assets/images/react-logo.png');

const VEHICLE_LIST_DRAW_DISTANCE = 320;
const VEHICLE_ITEM_TYPE = 'vehicle';

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dealerSearchQuery, setDealerSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isDealerModalVisible, setDealerModalVisible] = useState(false);
  const [dealerModalType, setDealerModalType] = useState<'Main' | 'Sub' | null>(null);
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const router = useRouter();
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

  const filteredDealers = useMemo(() => {
    if (!dealerSearchQuery) return mockSubDealers;
    return mockSubDealers.filter((d) =>
      d.name.toLowerCase().includes(dealerSearchQuery.toLowerCase())
    );
  }, [dealerSearchQuery]);

  const listOverrideProps = useMemo(() => {
    return { initialDrawBatchSize: 6 };
  }, []);

  const handleOpenFilters = useCallback(() => {
    setFilterModalVisible(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setFilterModalVisible(false);
  }, []);

  const openDealerModal = useCallback((type: 'Main' | 'Sub') => {
    setDealerModalType(type);
    setSelectedDealerId(null);
    setDealerSearchQuery('');
    setDealerModalVisible(true);
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

  const handleOpenVehicle = useCallback((vehicleId: string) => {
    router.push({
      pathname: '/vehicle-details/[vehicleId]',
      params: { vehicleId },
    });
  }, [router]);

  const renderVehicleItem = useCallback(({ item }: ListRenderItemInfo<Vehicle>) => {
    return <VehicleCard item={item} onPress={handleOpenVehicle} />;
  }, [handleOpenVehicle]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.topNav}>
          <Pressable style={styles.iconButton}>
            <Menu color="#FFFFFF" size={24} />
          </Pressable>

          <View style={styles.rightNav}>
            <Pressable style={styles.dealerSelector} onPress={() => openDealerModal('Main')}>
              <Text style={styles.dealerSelectorText}>Demo Dealer 1</Text>
              <ChevronDown color="#FFFFFF" size={16} style={styles.dealerChevron} />
            </Pressable>
            
            <Pressable style={styles.notificationButton} onPress={() => router.push('/notifications')}>
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
          <Pressable style={styles.mainDealerCard} onPress={() => openDealerModal('Sub')}>
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
          </Pressable>

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
              contentContainerStyle={styles.listContent as any}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>

      <DealerModal
        visible={isDealerModalVisible}
        type={dealerModalType}
        searchQuery={dealerSearchQuery}
        onSearchChange={setDealerSearchQuery}
        dealers={filteredDealers}
        selectedDealerId={selectedDealerId}
        onSelectDealer={setSelectedDealerId}
        onClose={() => setDealerModalVisible(false)}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilters}
      />
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
