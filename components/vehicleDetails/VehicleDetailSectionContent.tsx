import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { ArrowRight, Calendar, ChevronDown, ChevronUp, CloudUpload, Plus } from 'lucide-react-native';

import type { Vehicle } from '@/constants/mock-data';

type MediaTab = 'Media' | 'Social' | 'Dealer Selected';
type TrailingIcon = 'calendar' | 'chevron' | null;

interface VehicleDetailSectionContentProps {
  section?: string;
  title: string;
  vehicle: Vehicle;
}

interface SummaryField {
  label: string;
  value: string;
  trailingIcon: TrailingIcon;
}

interface FormField {
  label: string;
  value: string;
  trailingIcon: TrailingIcon;
  multiline?: boolean;
  minHeight?: number;
}

const SUMMARY_FIELDS: SummaryField[] = [
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
const OEM_CODE_VALUE = 'FE,STDEN,LA,AC,EY,IM,2T,3P,3T,5D,EF,G4,MF,...';
const PACKAGE_ITEMS = [
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
const OPTION_GROUPS = [
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
const MEDIA_TABS: MediaTab[] = ['Media', 'Social', 'Dealer Selected'];
const SELECTED_MEDIA_INDEXES = [2, 3];

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
              onChangeText={(value) => onChangeValue(field.label, value)}
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
      <View style={styles.stack}>
        <Text style={styles.sectionHeading}>Product Media</Text>
        <Pressable style={styles.uploadBox}>
          <CloudUpload size={18} color="#B8B8B8" />
          <Text style={styles.uploadText}>Upload Media</Text>
        </Pressable>
        <View style={styles.mediaHeader}>
          <Text style={styles.mediaHeaderLabel}>Media</Text>
          <View style={styles.mediaTabs}>
            {MEDIA_TABS.map((tab) => (
              <Pressable
                key={tab}
                style={styles.mediaTab}
                onPress={() => setActiveMediaTab(tab)}
              >
                <Text style={[styles.mediaTabText, activeMediaTab === tab && styles.mediaTabTextActive]}>
                  {tab}
                </Text>
                {activeMediaTab === tab ? <View style={styles.mediaTabUnderline} /> : null}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.mediaGrid}>
          {mediaItems.map((item) => (
            <Pressable key={`${activeMediaTab}-${item}`} style={styles.mediaCard}>
              <Image
                source={vehicle.image}
                style={styles.mediaThumb}
                contentFit="cover"
                cachePolicy="memory-disk"
                recyclingKey={`${vehicle.id}-${activeMediaTab}-${item}`}
                transition={0}
              />
              {item === 0 ? (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryBadgeText}>Primary</Text>
                </View>
              ) : null}
              {SELECTED_MEDIA_INDEXES.includes(item) ? <View style={styles.selectedBadge} /> : null}
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  if (section === 'installed-packages') {
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
  }

  if (section === 'product-options') {
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
  uploadBox: { height: 118, borderRadius: 8, backgroundColor: '#ECECEC', alignItems: 'center', justifyContent: 'center', gap: 8 },
  uploadText: { fontSize: 8, fontWeight: '500', color: '#8A8A8A' },
  mediaHeader: { gap: 6 },
  mediaHeaderLabel: { fontSize: 10, fontWeight: '500', color: '#555555' },
  mediaTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  mediaTab: { flex: 1, height: 28, alignItems: 'center', justifyContent: 'center' },
  mediaTabText: { fontSize: 8, fontWeight: '500', color: '#7C7C7C' },
  mediaTabTextActive: { color: '#2492D4' },
  mediaTabUnderline: { position: 'absolute', bottom: -1, width: 40, height: 1.5, backgroundColor: '#2492D4' },
  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  mediaCard: { width: '48.3%', borderRadius: 10, overflow: 'hidden', position: 'relative' },
  mediaThumb: { width: '100%', aspectRatio: 1.1, borderRadius: 10, backgroundColor: '#DDDDDD' },
  primaryBadge: { position: 'absolute', left: 8, bottom: 8, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.55)', paddingHorizontal: 8, paddingVertical: 3 },
  primaryBadgeText: { fontSize: 8, fontWeight: '600', color: '#FFFFFF' },
  selectedBadge: { position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderRadius: 4, backgroundColor: '#2492D4', borderWidth: 1.5, borderColor: '#FFFFFF' },
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
  optionCard: { minHeight: 46, borderRadius: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E7', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionCardTitle: { flex: 1, fontSize: 11, fontWeight: '500', color: '#333333', marginRight: 12 },
  groupCard: { borderRadius: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E4E4', overflow: 'hidden' },
  groupHeader: { minHeight: 34, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupTitle: { fontSize: 9, fontWeight: '500', color: '#555555' },
  groupOptions: { paddingHorizontal: 10, paddingBottom: 10, gap: 8 },
  optionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  optionCheckbox: { width: 10, height: 10, borderRadius: 2, borderWidth: 1, borderColor: '#DADADA', backgroundColor: '#FFFFFF', marginTop: 3 },
  optionText: { flex: 1, fontSize: 8.5, lineHeight: 14, fontWeight: '500', color: '#666666' },
  placeholderCard: { minHeight: 180, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E7', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12 },
  placeholderIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF5FD', alignItems: 'center', justifyContent: 'center' },
  placeholderTitle: { fontSize: 16, fontWeight: '700', color: '#1E1E1E' },
  placeholderText: { fontSize: 12, lineHeight: 18, textAlign: 'center', color: '#666666' },
});
