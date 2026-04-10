import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, Check } from 'lucide-react-native';

export const OEM_CODE_VALUE = 'FE,STDEN,LA,AC,EY,IM,2T,3P,3T,5D,EF,G4,MF,...';
export const PACKAGE_ITEMS = [
  '1500w Inverter With Two 120v Ac Outlets',
  '2.5l I4 Engine With Vvt-ie',
  '50 State Emissions',
  'All-weather Floor Liners Are Engineered To Precisely Fit Your Vehicle And Made From Flexible, Weather-resistant Material. Built, Full Coverage For Second And Third Rows Is Dual-sided-resistant Backing And Durable, Carpet-turn Fasteners Help Keep',
  '1500w Inverter With Two 120v Ac Outlets',
  '2.5l I4 Engine With Vvt-ie',
  '50 State Emissions',
  '2.5l I4 Engine With Vvt-ie',
  '50 State Emissions',
  '1500w Inverter With Two 120v Ac Outlets',
  '2.5l I4 Engine With Vvt-ie',
  '50 State Emissions',
] as const;

export const InstalledPackagesSection = () => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <View style={styles.stack}>
      <Text style={styles.sectionHeading}>Installed Packages</Text>
      <View style={styles.packagesSection}>
        <Text style={styles.fieldLabel}>OEM Code List</Text>
        <View style={styles.oemCodePill}>
          <Text style={styles.oemCodeText}>{OEM_CODE_VALUE}</Text>
        </View>
      </View>
      <View style={styles.packageListCard}>
        <View style={styles.packageListHeader}>
          <Text style={styles.packageListHeaderText}>Package</Text>
        </View>
        {PACKAGE_ITEMS.map((item, index) => {
          const isSelected = selectedItems.has(index);
          return (
            <Pressable
              key={`${item}-${index}`}
              style={[styles.packageRow, index === PACKAGE_ITEMS.length - 1 && styles.packageRowLast]}
              onPress={() => toggleItem(index)}
            >
              <View style={[styles.packageCheckbox, isSelected && styles.packageCheckboxSelected]}>
                {isSelected && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.packageRowText}>{item}</Text>
              <ArrowRight size={16} color="#2492D4" />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 14, fontWeight: '600', color: '#1E1E1E' },
  fieldLabel: { fontSize: 12, fontWeight: '500', color: '#555555' },
  packagesSection: { gap: 8 },
  oemCodePill: { minHeight: 40, borderRadius: 8, backgroundColor: '#EFEFEF', paddingHorizontal: 12, justifyContent: 'center' },
  oemCodeText: { fontSize: 14, fontWeight: '500', color: '#333333' },
  packageListCard: { borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', overflow: 'hidden' },
  packageListHeader: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', backgroundColor: '#F9F9F9' },
  packageListHeaderText: { fontSize: 14, fontWeight: '600', color: '#555555' },
  packageRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  packageRowLast: { borderBottomWidth: 0 },
  packageCheckbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#D8D8D8', backgroundColor: '#FFFFFF', marginRight: 12, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  packageCheckboxSelected: { backgroundColor: '#2492D4', borderColor: '#2492D4' },
  packageRowText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '500', color: '#333333', marginRight: 12 },
});