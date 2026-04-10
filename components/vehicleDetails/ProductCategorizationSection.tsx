import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const CATEGORIZATION_FIELDS: FormField[] = [
  { label: 'Dealer', value: 'Demo Dealership', trailingIcon: 'chevron', type: 'dropdown', options: ['Demo Dealership', 'Nalley Honda', 'Another Dealer'] },
  { label: 'Assigned to Salesperson', value: 'Select', trailingIcon: 'chevron', type: 'dropdown', options: ['Select', 'John Doe', 'Jane Smith'] },
  { label: 'Vehicle Category', value: 'Select', trailingIcon: 'chevron', type: 'dropdown', options: ['Select', 'Sedan', 'SUV', 'Truck'] },
  { label: 'Expiration Date', value: '2025-06-23', trailingIcon: 'calendar', type: 'date' },
];

interface ProductCategorizationSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductCategorizationSection = ({ onInputFocus }: ProductCategorizationSectionProps) => {
  return <FormSectionRenderer title="Product Categorization" fields={CATEGORIZATION_FIELDS} onInputFocus={onInputFocus} />;
};