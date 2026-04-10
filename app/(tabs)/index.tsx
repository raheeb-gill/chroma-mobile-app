import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, ChevronDown, Car, TrendingUp, ArrowRight, ListChecks, Atom, Search, X, Activity, LayoutGrid } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

import { Dealer, mockSubDealers } from '@/constants/mock-data';

export default function DashboardScreen() {
  const router = useRouter();
  const [isDealerModalVisible, setDealerModalVisible] = useState(false);
  const [dealerModalType, setDealerModalType] = useState<'Main' | 'Sub' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);

  const openDealerModal = (type: 'Main' | 'Sub') => {
    setDealerModalType(type);
    setSelectedDealerId(null);
    setSearchQuery('');
    setDealerModalVisible(true);
  };

  const filteredDealers = React.useMemo(() => {
    if (!searchQuery) return mockSubDealers;
    return mockSubDealers.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderDealerItem = ({ item }: { item: Dealer }) => {
    const isSelected = selectedDealerId === item.id;
    return (
      <Pressable
        style={[styles.modalDealerCard, isSelected && styles.modalDealerCardSelected]}
        onPress={() => setSelectedDealerId(item.id)}
      >
        <View style={styles.modalDealerLogoContainer}>
          <Text style={styles.modalDealerLogoFallback}>NALLEY</Text>
        </View>
        <View style={styles.modalDealerInfo}>
          <Text style={styles.modalDealerName}>{item.name}</Text>
          <View style={styles.modalDealerMetaRow}>
            <Car size={14} color="#777777" />
            <Text style={styles.modalDealerMetaText}>{item.vehiclesCount} vehicles</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Car size={14} color="#FFFFFF" />}
        </View>
      </Pressable>
    );
  };

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

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeSection}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
            <Text style={styles.welcomeText}>
              Welcome back, <Text style={styles.welcomeName}>Demo Dealer!</Text>
            </Text>
          </View>

          <Pressable style={styles.mainDealerCard} onPress={() => openDealerModal('Sub')}>
            <View style={styles.mainDealerRow}>
              <View style={styles.dealerLogoBox}>
                <Atom size={28} color="#1C9EF4" />
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

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#1C9EF4' }]}>
                <Car size={24} color="#FFFFFF" />
              </View>
              <View style={styles.statContent}>
                <View style={styles.statHeaderRow}>
                  <Text style={styles.statLabel}>Total Vehicles</Text>
                  <View style={styles.trendRow}>
                    <TrendingUp size={12} color="#34C759" />
                    <Text style={styles.trendTextPositive}>12 <Text style={styles.trendContext}>from last month</Text></Text>
                  </View>
                </View>
                <Text style={styles.statValue}>247</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#1C9EF4' }]}>
                <ListChecks size={24} color="#FFFFFF" />
              </View>
              <View style={styles.statContent}>
                <View style={styles.statHeaderRow}>
                  <Text style={styles.statLabel}>Active Listings</Text>
                  <View style={styles.trendRow}>
                    <TrendingUp size={12} color="#34C759" />
                    <Text style={styles.trendTextPositive}>76% <Text style={styles.trendContext}>of inventory</Text></Text>
                  </View>
                </View>
                <Text style={styles.statValue}>189</Text>
              </View>
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerCircle}>
              <ChevronDown size={16} color="#1C9EF4" />
            </View>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <Pressable style={styles.actionCard} onPress={() => router.push('/inventory')}>
              <View style={styles.actionIconBox}>
                <LayoutGrid size={20} color="#1C9EF4" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>View Inventory</Text>
                <Text style={styles.actionSubtitle}>Browse all vehicles</Text>
              </View>
              <ArrowRight size={20} color="#1C9EF4" />
            </Pressable>

            <Pressable style={styles.actionCard}>
              <View style={styles.actionIconBox}>
                <Activity size={20} color="#1C9EF4" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Analytics</Text>
                <Text style={styles.actionSubtitle}>Browse all vehicles</Text>
              </View>
              <ArrowRight size={20} color="#1C9EF4" />
            </Pressable>
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* Dealer Modal */}
      <Modal
        visible={isDealerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDealerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Switch {dealerModalType} Dealer</Text>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setDealerModalVisible(false)}
              >
                <X size={16} color="#999999" />
              </Pressable>
            </View>

            <View style={styles.modalSearchContainer}>
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search dealer"
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
              <Search size={20} color="#1E1E1E" style={styles.modalSearchIcon} />
            </View>

            <View style={styles.modalListContainer}>
              <FlashList
                data={filteredDealers}
                renderItem={renderDealerItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.modalListContent as any}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.modalFooter}>
              <Pressable
                onPress={() => setDealerModalVisible(false)}
                disabled={!selectedDealerId}
                style={[
                  styles.modalSwitchButton,
                  !selectedDealerId ? styles.modalSwitchButtonDisabled : styles.modalSwitchButtonEnabled,
                ]}
              >
                <Text style={styles.modalSwitchButtonText}>Switch {dealerModalType} Dealer</Text>
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
    backgroundColor: '#F5F7FA',
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
  scrollContent: {
    paddingBottom: 40,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  dashboardTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  welcomeName: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mainDealerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
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
  statsContainer: {
    gap: 16,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendTextPositive: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
  trendContext: {
    color: '#999999',
    fontWeight: '400',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C9EF4',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6F0FF',
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#999999',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
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
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 48,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    height: '100%',
  },
  modalSearchIcon: {
    marginLeft: 8,
  },
  modalListContainer: {
    flex: 1,
  },
  modalListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalDealerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  modalDealerCardSelected: {
    borderColor: '#2492D4',
  },
  modalDealerLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalDealerLogoFallback: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E1E1E',
  },
  modalDealerInfo: {
    flex: 1,
    gap: 4,
  },
  modalDealerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  modalDealerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalDealerMetaText: {
    fontSize: 14,
    color: '#777777',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#2492D4',
    borderColor: '#2492D4',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  modalSwitchButton: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalSwitchButtonEnabled: {
    backgroundColor: '#2492D4',
  },
  modalSwitchButtonDisabled: {
    backgroundColor: '#979797',
  },
  modalSwitchButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});