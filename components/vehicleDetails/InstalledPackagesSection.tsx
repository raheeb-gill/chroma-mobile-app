import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

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
        {PACKAGE_ITEMS.map((item, index) => (
          <View
            key={`${item}-${index}`}
            style={[styles.packageRow, index === PACKAGE_ITEMS.length - 1 && styles.packageRowLast]}
          >
            <View style={styles.packageCheckbox} />
            <Text style={styles.packageRowText}>{item}</Text>
            <ArrowRight size={14} color="#2492D4" />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 10, fontWeight: '500', color: '#555555' },
  fieldLabel: { fontSize: 10, fontWeight: '500', color: '#555555' },
  packagesSection: { gap: 8 },
  oemCodePill: { minHeight: 34, borderRadius: 8, backgroundColor: '#EFEFEF', paddingHorizontal: 12, justifyContent: 'center' },
  oemCodeText: { fontSize: 10, fontWeight: '500', color: '#8B8B8B' },
  packageListCard: { borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E6E6', overflow: 'hidden' },
  packageListHeader: { minHeight: 40, justifyContent: 'center', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  packageListHeaderText: { fontSize: 10, fontWeight: '500', color: '#8C8C8C' },
  packageRow: { minHeight: 41, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  packageRowLast: { borderBottomWidth: 0 },
  packageCheckbox: { width: 12, height: 12, borderRadius: 2, borderWidth: 1, borderColor: '#D8D8D8', backgroundColor: '#FFFFFF', marginRight: 8, marginTop: 2 },
  packageRowText: { flex: 1, fontSize: 9, lineHeight: 14, fontWeight: '500', color: '#555555', marginRight: 8 },
});