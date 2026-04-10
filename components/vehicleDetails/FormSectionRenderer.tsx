import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';

export type TrailingIcon = 'calendar' | 'chevron' | null;

export interface FormField {
  label: string;
  value: string;
  trailingIcon: TrailingIcon;
  multiline?: boolean;
  minHeight?: number;
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
        return (
          <View key={field.label} style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
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
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: { gap: 12 },
  sectionHeading: { fontSize: 10, fontWeight: '500', color: '#555555' },
  fieldBlock: { gap: 6 },
  fieldLabel: { fontSize: 10, fontWeight: '500', color: '#555555' },
  fieldInput: { minHeight: 42, borderRadius: 8, backgroundColor: '#EFEFEF', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  multilineFieldInput: { alignItems: 'flex-start', paddingVertical: 10 },
  textInput: { flex: 1, paddingVertical: 11, fontSize: 11, fontWeight: '500', color: '#1E1E1E' },
  textInputWithIcon: { paddingRight: 10 },
  multilineTextInput: { minHeight: 52, paddingVertical: 0 },
});