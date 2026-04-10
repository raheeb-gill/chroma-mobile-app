import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const CAPABILITY_FIELDS: FormField[] = [
  { label: 'Fuel', value: '', trailingIcon: null },
  { label: 'Drive Train', value: '', trailingIcon: null },
  { label: 'City MPG', value: '', trailingIcon: null },
  { label: 'Hwy MPG', value: '', trailingIcon: null },
];

interface ProductCapabilitiesSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductCapabilitiesSection = ({ onInputFocus }: ProductCapabilitiesSectionProps) => {
  return <FormSectionRenderer title="Product Capabilities" fields={CAPABILITY_FIELDS} onInputFocus={onInputFocus} />;
};