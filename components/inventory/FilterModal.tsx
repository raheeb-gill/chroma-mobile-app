import React, { useMemo } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, Calendar as CalendarIcon, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  const insets = useSafeAreaInsets();
  
  const modalFooterInsetStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 20 };
  }, [insets.bottom]);

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
            <Text style={styles.modalTitle}>Filters</Text>
            <Pressable
              style={styles.modalCloseButton}
              onPress={onClose}
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
              onPress={onClose}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
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