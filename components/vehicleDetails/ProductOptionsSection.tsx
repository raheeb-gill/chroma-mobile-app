import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

export const OPTION_GROUPS = [
  {
    title: 'Custom Features',
    expanded: true,
    options: [
      '* 1-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* CARFAX 1-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK X-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
    ],
  },
  {
    title: 'Exterior',
    expanded: true,
    options: [
      '* 4WD *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
      '* 4-OWNER *',
      '* TOUCH OF SERVICE HERE *',
      '* BLACK 1-OWNER *',
    ],
  },
  { title: 'Interior', expanded: false, options: [] },
  { title: 'Mechanical', expanded: false, options: [] },
  { title: 'Safety', expanded: false, options: [] },
  { title: 'Technology', expanded: false, options: [] },
  { title: 'Other', expanded: false, options: [] },
] as const;

export const ProductOptionsSection = () => {
  return (
    <View style={styles.stack}>
      <Text style={styles.sectionHeading}>Product Options</Text>
      {OPTION_GROUPS.map((group) => (
        <View key={group.title} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.expanded ? (
              <ChevronUp size={16} color="#666666" />
            ) : (
              <ChevronDown size={16} color="#666666" />
            )}
          </View>
          {group.expanded ? (
            <View style={styles.groupOptions}>
              {group.options.map((option, index) => (
                <View key={`${group.title}-${index}`} style={styles.optionRow}>
                  <View style={styles.optionCheckbox} />
                  <Text style={styles.optionText}>{option}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 10, fontWeight: '500', color: '#555555' },
  groupCard: { borderRadius: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E4E4', overflow: 'hidden' },
  groupHeader: { minHeight: 34, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupTitle: { fontSize: 9, fontWeight: '500', color: '#555555' },
  groupOptions: { paddingHorizontal: 10, paddingBottom: 10, gap: 8 },
  optionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  optionCheckbox: { width: 10, height: 10, borderRadius: 2, borderWidth: 1, borderColor: '#DADADA', backgroundColor: '#FFFFFF', marginTop: 3 },
  optionText: { flex: 1, fontSize: 8.5, lineHeight: 14, fontWeight: '500', color: '#666666' },
});