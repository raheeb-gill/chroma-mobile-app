import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const CATEGORIZATION_FIELDS: FormField[] = [
  { label: 'Dealer', value: 'Demo Dealership', trailingIcon: 'chevron' },
  { label: 'Assigned to Salesperson', value: 'Select', trailingIcon: 'chevron' },
  { label: 'Vehicle Category', value: 'Select', trailingIcon: 'chevron' },
  { label: 'Expiration Date', value: 'Monday, June 23, 2025', trailingIcon: 'calendar' },
];

interface ProductCategorizationSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductCategorizationSection = ({ onInputFocus }: ProductCategorizationSectionProps) => {
  return <FormSectionRenderer title="Product Categorization" fields={CATEGORIZATION_FIELDS} onInputFocus={onInputFocus} />;
};