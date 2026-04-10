import React, { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Car, Search, X } from 'lucide-react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Dealer } from '@/constants/mock-data';

interface DealerModalProps {
  visible: boolean;
  type: 'Main' | 'Sub' | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dealers: Dealer[];
  selectedDealerId: string | null;
  onSelectDealer: (id: string) => void;
  onClose: () => void;
}

export const DealerModal = ({
  visible,
  type,
  searchQuery,
  onSearchChange,
  dealers,
  selectedDealerId,
  onSelectDealer,
  onClose,
}: DealerModalProps) => {

  const renderDealerItem = useCallback(({ item }: ListRenderItemInfo<Dealer>) => {
    const isSelected = selectedDealerId === item.id;
    return (
      <Pressable
        style={[styles.modalDealerCard, isSelected && styles.modalDealerCardSelected]}
        onPress={() => onSelectDealer(item.id)}
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
  }, [selectedDealerId, onSelectDealer]);

  const keyExtractor = useCallback((item: Dealer) => item.id, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Switch {type} Dealer</Text>
            <Pressable
              style={styles.modalCloseButton}
              onPress={onClose}
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
              onChangeText={onSearchChange}
              autoCorrect={false}
            />
            <Search size={20} color="#1E1E1E" style={styles.modalSearchIcon} />
          </View>

          <View style={styles.modalListContainer}>
            <FlashList
              data={dealers}
              renderItem={renderDealerItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.modalListContent as any}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.modalFooter}>
            <Pressable
              onPress={onClose}
              disabled={!selectedDealerId}
              style={[
                styles.modalSwitchButton,
                !selectedDealerId ? styles.modalSwitchButtonDisabled : styles.modalSwitchButtonEnabled,
              ]}
            >
              <Text style={styles.modalSwitchButtonText}>Switch {type} Dealer</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingTop: 16,
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