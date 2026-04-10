import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { CustomDropdown } from '../ui/CustomDropdown';
import { CustomCalendar } from '../ui/CustomCalendar';

export type TrailingIcon = 'calendar' | 'chevron' | null;

export interface FormField {
  label: string;
  value: string;
  trailingIcon: TrailingIcon;
  multiline?: boolean;
  minHeight?: number;
  type?: 'text' | 'dropdown' | 'date';
  options?: string[];
}

interface FormSectionRendererProps {
  title: string;
  fields: readonly FormField[];
  onInputFocus?: (node: any) => void;
}

const createInitialValues = (
  fields: readonly { label: string; value: string }[]
): Record<string, string> => {
  const values: Record<string, string> = {};
  fields.forEach((field) => {
    values[field.label] = field.value;
  });
  return values;
};

export const FormSectionRenderer = ({ title, fields, onInputFocus }: FormSectionRendererProps) => {
  const [values, setValues] = useState<Record<string, string>>(() =>
    createInitialValues(fields)
  );

  const [activeDropdown, setActiveDropdown] = useState<{ label: string, title: string, options: string[] } | null>(null);
  const [activeCalendar, setActiveCalendar] = useState<{ label: string, title: string } | null>(null);

  const handleChangeValue = useCallback((label: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const renderTrailingIcon = (trailingIcon: TrailingIcon) => {
    if (trailingIcon === 'calendar') {
      return <Calendar size={16} color="#8D8D8D" />;
    }
    if (trailingIcon === 'chevron') {
      return <ChevronDown size={16} color="#8D8D8D" />;
    }
    return null;
  };

  return (
    <View style={styles.stack}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {fields.map((field) => {
        const isMultiline = Boolean(field.multiline);
        const isDropdown = field.type === 'dropdown';
        const isDate = field.type === 'date';

        return (
          <View key={field.label} style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {isDropdown ? (
              <Pressable 
                style={styles.fieldInput} 
                onPress={() => setActiveDropdown({ label: field.label, title: field.label, options: field.options || [] })}
              >
                <Text style={styles.dropdownText}>{values[field.label]}</Text>
                {renderTrailingIcon(field.trailingIcon || 'chevron')}
              </Pressable>
            ) : isDate ? (
              <Pressable 
                style={styles.fieldInput} 
                onPress={() => setActiveCalendar({ label: field.label, title: field.label })}
              >
                <Text style={styles.dropdownText}>{values[field.label]}</Text>
                {renderTrailingIcon(field.trailingIcon || 'calendar')}
              </Pressable>
            ) : (
              <View
                style={[
                  styles.fieldInput,
                  isMultiline && styles.multilineFieldInput,
                  isMultiline && field.minHeight ? { minHeight: field.minHeight } : null,
                ]}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    field.trailingIcon && styles.textInputWithIcon,
                    isMultiline && styles.multilineTextInput,
                  ]}
                  value={values[field.label]}
                  onChangeText={(value) => handleChangeValue(field.label, value)}
                  onFocus={(e) => {
                    if (onInputFocus) {
                      onInputFocus(e.target);
                    }
                  }}
                  placeholderTextColor="#999999"
                  selectionColor="#2492D4"
                  multiline={isMultiline}
                  textAlignVertical={isMultiline ? 'top' : 'center'}
                />
                {renderTrailingIcon(field.trailingIcon)}
              </View>
            )}
          </View>
        );
      })}
      
      {activeDropdown && (
        <CustomDropdown
          visible={!!activeDropdown}
          title={activeDropdown.title}
          options={activeDropdown.options}
          selectedValue={values[activeDropdown.label] || ''}
          onSelect={(value) => handleChangeValue(activeDropdown.label, value)}
          onClose={() => setActiveDropdown(null)}
        />
      )}

      {activeCalendar && (
        <CustomCalendar
          visible={!!activeCalendar}
          title={activeCalendar.title}
          selectedDate={values[activeCalendar.label] || ''}
          onSelect={(value) => handleChangeValue(activeCalendar.label, value)}
          onClose={() => setActiveCalendar(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 14, fontWeight: '600', color: '#1E1E1E' },
  fieldBlock: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '500', color: '#555555' },
  fieldInput: { minHeight: 48, borderRadius: 8, backgroundColor: '#F5F5F5', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  multilineFieldInput: { alignItems: 'flex-start', paddingVertical: 12 },
  textInput: { flex: 1, paddingVertical: 12, fontSize: 14, fontWeight: '500', color: '#1E1E1E' },
  dropdownText: { flex: 1, fontSize: 14, fontWeight: '500', color: '#1E1E1E' },
  textInputWithIcon: { paddingRight: 10 },
  multilineTextInput: { minHeight: 52, paddingVertical: 0 },
});