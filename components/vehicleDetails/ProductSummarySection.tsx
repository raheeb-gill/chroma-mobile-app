import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const SUMMARY_FIELDS: FormField[] = [
  { label: 'VIN', value: '1HGCM82633A123456', trailingIcon: null },
  { label: 'Availability', value: 'Available', trailingIcon: 'chevron', type: 'dropdown', options: ['Available', 'Sold', 'Pending'] },
  { label: 'Year', value: '2023', trailingIcon: 'chevron', type: 'dropdown', options: ['2025', '2024', '2023', '2022', '2021'] },
  { label: 'Make', value: 'Jeep', trailingIcon: null },
  { label: 'Model', value: 'Grand Cherokee', trailingIcon: null },
  { label: 'Trim Level', value: 'Limited 4x4 Sport Utility', trailingIcon: null },
  { label: 'Stock', value: '5', trailingIcon: null },
  { label: 'New / Used', value: 'Pre-Owned', trailingIcon: null },
  { label: 'Style', value: 'SUV', trailingIcon: null },
  { label: 'New / Demo', value: 'Used', trailingIcon: 'chevron', type: 'dropdown', options: ['New', 'Demo', 'Used'] },
  { label: 'Price', value: '$56,991', trailingIcon: null },
  { label: 'Body Style', value: 'SUV', trailingIcon: null },
  { label: 'Certified', value: 'No', trailingIcon: null },
  { label: 'Engine', value: '3.6L V6', trailingIcon: null },
  { label: 'Fuel Type', value: 'Gas', trailingIcon: null },
  { label: 'Drive Train', value: '4WD', trailingIcon: null },
  { label: 'Transmission', value: 'Automatic', trailingIcon: 'chevron', type: 'dropdown', options: ['Automatic', 'Manual'] },
];

interface ProductSummarySectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductSummarySection = ({ onInputFocus }: ProductSummarySectionProps) => {
  return <FormSectionRenderer title="Product Summary" fields={SUMMARY_FIELDS} onInputFocus={onInputFocus} />;
};