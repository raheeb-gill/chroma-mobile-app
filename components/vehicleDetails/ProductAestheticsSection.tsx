import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const AESTHETICS_FIELDS: FormField[] = [
  { label: 'Body Style', value: '', trailingIcon: null },
  { label: 'Color Description', value: '', trailingIcon: null, multiline: true, minHeight: 74 },
  { label: 'Exterior Int Color', value: '', trailingIcon: null },
  { label: 'Exterior Color Code', value: '', trailingIcon: null },
  { label: 'Interior Int Color', value: '', trailingIcon: null },
  { label: 'Interior Color Code', value: '', trailingIcon: null },
  { label: 'Shape', value: '', trailingIcon: null, multiline: true, minHeight: 74 },
];

interface ProductAestheticsSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductAestheticsSection = ({ onInputFocus }: ProductAestheticsSectionProps) => {
  return <FormSectionRenderer title="Product Aesthetics" fields={AESTHETICS_FIELDS} onInputFocus={onInputFocus} />;
};