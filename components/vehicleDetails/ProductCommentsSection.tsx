import React from 'react';
import { FormSectionRenderer, type FormField } from './FormSectionRenderer';

export const COMMENT_BLOCKS: FormField[] = [
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
];

interface ProductCommentsSectionProps {
  onInputFocus?: (node: any) => void;
}

export const ProductCommentsSection = ({ onInputFocus }: ProductCommentsSectionProps) => {
  return <FormSectionRenderer title="Product Comments" fields={COMMENT_BLOCKS} onInputFocus={onInputFocus} />;
};