import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, ChevronUp, Check } from 'lucide-react-native';

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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const initialExpanded = new Set<string>();
    OPTION_GROUPS.forEach(group => {
      if (group.expanded) initialExpanded.add(group.title);
    });
    return initialExpanded;
  });

  const toggleItem = (optionKey: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(optionKey)) {
        next.delete(optionKey);
      } else {
        next.add(optionKey);
      }
      return next;
    });
  };

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupTitle)) {
        next.delete(groupTitle);
      } else {
        next.add(groupTitle);
      }
      return next;
    });
  };

  return (
    <View style={styles.stack}>
      <Text style={styles.sectionHeading}>Product Options</Text>
      {OPTION_GROUPS.map((group) => {
        const isExpanded = expandedGroups.has(group.title);
        
        return (
          <View key={group.title} style={styles.groupCard}>
            <Pressable 
              style={styles.groupHeader}
              onPress={() => toggleGroup(group.title)}
            >
              <Text style={styles.groupTitle}>{group.title}</Text>
              {isExpanded ? (
                <ChevronUp size={20} color="#666666" />
              ) : (
                <ChevronDown size={20} color="#666666" />
              )}
            </Pressable>
            {isExpanded ? (
              <View style={styles.groupOptions}>
                {group.options.map((option, index) => {
                  const optionKey = `${group.title}-${index}`;
                  const isSelected = selectedItems.has(optionKey);
                  return (
                    <Pressable 
                      key={optionKey} 
                      style={styles.optionRow}
                      onPress={() => toggleItem(optionKey)}
                    >
                      <View style={[styles.optionCheckbox, isSelected && styles.optionCheckboxSelected]}>
                        {isSelected && <Check size={12} color="#FFFFFF" />}
                      </View>
                      <Text style={styles.optionText}>{option}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 14, fontWeight: '600', color: '#1E1E1E' },
  groupCard: { borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E4E4', overflow: 'hidden' },
  groupHeader: { minHeight: 48, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9F9F9', borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  groupTitle: { fontSize: 14, fontWeight: '600', color: '#333333' },
  groupOptions: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14, gap: 12 },
  optionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  optionCheckbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#DADADA', backgroundColor: '#FFFFFF', marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  optionCheckboxSelected: { backgroundColor: '#2492D4', borderColor: '#2492D4' },
  optionText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '500', color: '#333333' },
});