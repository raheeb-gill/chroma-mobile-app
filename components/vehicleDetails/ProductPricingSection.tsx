import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const PRICING_FIELDS: FormField[] = [
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
];

interface ProductPricingSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductPricingSection = ({ onInputFocus }: ProductPricingSectionProps) => {
  return <FormSectionRenderer title="Product Pricing Option" fields={PRICING_FIELDS} onInputFocus={onInputFocus} />;
};