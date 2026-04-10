import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Calendar, ChevronDown, Plus } from 'lucide-react-native';

import type { Vehicle } from '@/constants/mock-data';
import { ProductMediaSection, type MediaTab } from './ProductMediaSection';
import { InstalledPackagesSection } from './InstalledPackagesSection';
import { ProductOptionsSection } from './ProductOptionsSection';

export type TrailingIcon = 'calendar' | 'chevron' | null;

interface VehicleDetailSectionContentProps {
  section?: string;
  title: string;
  vehicle: Vehicle;
  onInputFocus?: (node: any) => void;
}

export interface FormField {
  label: string;
  value: string;
  trailingIcon: TrailingIcon;
  multiline?: boolean;
  minHeight?: number;
}

const SUMMARY_FIELDS: FormField[] = [
  { label: 'VIN', value: '1HGCM82633A123456', trailingIcon: null },
  { label: 'Availability', value: 'Available', trailingIcon: 'chevron' },
  { label: 'Year', value: '2023', trailingIcon: 'calendar' },
  { label: 'Make', value: 'Jeep', trailingIcon: null },
  { label: 'Model', value: 'Grand Cherokee', trailingIcon: null },
  { label: 'Trim Level', value: 'Limited 4x4 Sport Utility', trailingIcon: null },
  { label: 'Stock', value: '5', trailingIcon: null },
  { label: 'New / Used', value: 'Pre-Owned', trailingIcon: null },
  { label: 'Style', value: 'SUV', trailingIcon: null },
  { label: 'New / Demo', value: 'Used', trailingIcon: 'chevron' },
  { label: 'Price', value: '$56,991', trailingIcon: null },
  { label: 'Body Style', value: 'SUV', trailingIcon: null },
  { label: 'Certified', value: 'No', trailingIcon: null },
  { label: 'Engine', value: '3.6L V6', trailingIcon: null },
  { label: 'Fuel Type', value: 'Gas', trailingIcon: null },
  { label: 'Drive Train', value: '4WD', trailingIcon: null },
  { label: 'Transmission', value: 'Automatic', trailingIcon: 'chevron' },
];

const COMMENT_BLOCKS = [
  {
    label: 'Headline',
    value: '',
    trailingIcon: null,
    multiline: true,
    minHeight: 74,
  },
  {
    label: 'Auto-Generated Comments',
    value:
      'Demo Dealer offers this 2023 Toyota Sequoia for sale. Available at MSRP from Demo Dealer, this top-quality vehicle could soon find a new owner. This beautiful 2023 Toyota Sequoia is ready to go through the details of this car? You can inspect additional information below. This and other vehicles are in sale in Elkhart, IN.\n\nHighlighting Pkg and 5.6L 8-cyl gas FFV. This Toyota is a dynamic and exceptional choice with black, 4x4, designer trim, front passenger seat, front memory seat, power folding mirror, power door locks, compass, eco friendly gas mileage, break assist, rearview sensor, cooled front seats, cruise control, voice recognition, back camera, keyless entry, digital pedal powered adjustable seats, trunk power closure and more.',
    trailingIcon: null,
    multiline: true,
    minHeight: 152,
  },
  {
    label: 'ASAP Description',
    value: '',
    trailingIcon: null,
    multiline: true,
    minHeight: 92,
  },
  {
    label: 'Google Directly Connect',
    value: '',
    trailingIcon: null,
    multiline: true,
    minHeight: 92,
  },
] as const satisfies readonly FormField[];
const PRICING_FIELDS = [
  { label: 'MSRP', value: '$729', trailingIcon: null },
  { label: 'Discount Description (For Price Fact only)', value: '', trailingIcon: null, multiline: true, minHeight: 74 },
  { label: 'Sticker Price / Extras', value: '', trailingIcon: null },
  { label: 'B&H™ "Add" Price', value: '', trailingIcon: null },
  { label: 'Kelly Blue Book', value: '', trailingIcon: null },
  { label: 'Black Book', value: '', trailingIcon: null },
  { label: 'Buy Now', value: '', trailingIcon: null },
  { label: 'Minimum / Reserve', value: '', trailingIcon: null },
  { label: 'Wholesale', value: '', trailingIcon: null },
  { label: 'Cost', value: '', trailingIcon: null },
  { label: 'M&Ds', value: '', trailingIcon: null },
  { label: 'Book Value', value: '', trailingIcon: null },
  { label: 'Manufacturer Rebates', value: '', trailingIcon: null },
  { label: 'Adjusted Price', value: '', trailingIcon: null },
] as const satisfies readonly FormField[];
const AESTHETICS_FIELDS = [
  { label: 'Body Style', value: '', trailingIcon: null },
  { label: 'Color Description', value: '', trailingIcon: null, multiline: true, minHeight: 74 },
  { label: 'Exterior Int Color', value: '', trailingIcon: null },
  { label: 'Exterior Color Code', value: '', trailingIcon: null },
  { label: 'Interior Int Color', value: '', trailingIcon: null },
  { label: 'Interior Color Code', value: '', trailingIcon: null },
  { label: 'Shape', value: '', trailingIcon: null, multiline: true, minHeight: 74 },
] as const satisfies readonly FormField[];
const CAPABILITY_FIELDS = [
  { label: 'Fuel', value: '', trailingIcon: null },
  { label: 'Drive Train', value: '', trailingIcon: null },
  { label: 'City MPG', value: '', trailingIcon: null },
  { label: 'Hwy MPG', value: '', trailingIcon: null },
] as const satisfies readonly FormField[];
const CATEGORIZATION_FIELDS = [
  { label: 'Dealer', value: 'Demo Dealership', trailingIcon: 'chevron' },
  { label: 'Assigned to Salesperson', value: 'Select', trailingIcon: 'chevron' },
  { label: 'Vehicle Category', value: 'Select', trailingIcon: 'chevron' },
  { label: 'Expiration Date', value: 'Monday, June 23, 2025', trailingIcon: 'calendar' },
] as const satisfies readonly FormField[];

const createInitialValues = (
  fields: readonly { label: string; value: string }[]
): Record<string, string> => {
  const values: Record<string, string> = {};
  fields.forEach((field) => {
    values[field.label] = field.value;
  });
  return values;
};

export const VehicleDetailSectionContent = ({
  section,
  title,
  vehicle,
  onInputFocus,
}: VehicleDetailSectionContentProps) => {
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>('Media');
  const [summaryValues, setSummaryValues] = useState<Record<string, string>>(() =>
    createInitialValues(SUMMARY_FIELDS)
  );
  const [commentValues, setCommentValues] = useState<Record<string, string>>(() =>
    createInitialValues(COMMENT_BLOCKS)
  );
  const [pricingValues, setPricingValues] = useState<Record<string, string>>(() =>
    createInitialValues(PRICING_FIELDS)
  );
  const [aestheticValues, setAestheticValues] = useState<Record<string, string>>(() =>
    createInitialValues(AESTHETICS_FIELDS)
  );
  const [capabilityValues, setCapabilityValues] = useState<Record<string, string>>(() =>
    createInitialValues(CAPABILITY_FIELDS)
  );
  const [categorizationValues, setCategorizationValues] = useState<Record<string, string>>(() =>
    createInitialValues(CATEGORIZATION_FIELDS)
  );

  const mediaItems = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => index);
  }, []);

  const handleChangeSummaryValue = useCallback((label: string, value: string) => {
    setSummaryValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const handleChangeCommentValue = useCallback((label: string, value: string) => {
    setCommentValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const handleChangePricingValue = useCallback((label: string, value: string) => {
    setPricingValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const handleChangeAestheticValue = useCallback((label: string, value: string) => {
    setAestheticValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const handleChangeCapabilityValue = useCallback((label: string, value: string) => {
    setCapabilityValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }));
  }, []);

  const handleChangeCategorizationValue = useCallback((label: string, value: string) => {
    setCategorizationValues((currentValues) => ({
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

  const renderEditableFields = (
    fields: readonly FormField[],
    values: Record<string, string>,
    onChangeValue: (label: string, value: string) => void
  ) => {
    return fields.map((field) => {
      const isMultiline = Boolean(field.multiline);
      return (
        <View 
          key={field.label} 
          style={styles.fieldBlock}
        >
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
              onChangeText={(value) => onChangeValue(field.label, value)}
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
    });
  };

  if (section === 'product-summary') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Summary</Text>
        {renderEditableFields(SUMMARY_FIELDS, summaryValues, handleChangeSummaryValue)}
      </View>
    );
  }

  if (section === 'product-media') {
    return (
      <ProductMediaSection
        vehicle={vehicle}
        activeMediaTab={activeMediaTab}
        setActiveMediaTab={setActiveMediaTab}
        mediaItems={mediaItems}
      />
    );
  }

  if (section === 'installed-packages') {
    return <InstalledPackagesSection />;
  }

  if (section === 'product-options') {
    return <ProductOptionsSection />;
  }

  if (section === 'product-comments') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Comments</Text>
        {renderEditableFields(COMMENT_BLOCKS, commentValues, handleChangeCommentValue)}
      </View>
    );
  }

  if (section === 'product-pricing-options') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Pricing Option</Text>
        {renderEditableFields(PRICING_FIELDS, pricingValues, handleChangePricingValue)}
      </View>
    );
  }

  if (section === 'product-aesthetics') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Aesthetics</Text>
        {renderEditableFields(AESTHETICS_FIELDS, aestheticValues, handleChangeAestheticValue)}
      </View>
    );
  }

  if (section === 'product-capabilities') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Capabilities</Text>
        {renderEditableFields(CAPABILITY_FIELDS, capabilityValues, handleChangeCapabilityValue)}
      </View>
    );
  }

  if (section === 'product-categorization') {
    return (
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Categorization</Text>
        {renderEditableFields(
          CATEGORIZATION_FIELDS,
          categorizationValues,
          handleChangeCategorizationValue
        )}
      </View>
    );
  }

  return (
    <View style={styles.placeholderCard}>
      <View style={styles.placeholderIcon}>
        <Plus size={18} color="#2492D4" />
      </View>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>This section page is ready and can be expanded with its own form fields and actions.</Text>
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
  placeholderCard: { minHeight: 180, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E7', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12 },
  placeholderIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF5FD', alignItems: 'center', justifyContent: 'center' },
  placeholderTitle: { fontSize: 16, fontWeight: '700', color: '#1E1E1E' },
  placeholderText: { fontSize: 12, lineHeight: 18, textAlign: 'center', color: '#666666' },
});
