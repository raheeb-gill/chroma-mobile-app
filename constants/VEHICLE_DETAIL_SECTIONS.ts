export const VEHICLE_DETAIL_SECTIONS = [
  { label: 'Product Summary', slug: 'product-summary' },
  { label: 'Product Media', slug: 'product-media' },
  { label: 'Installed Packages', slug: 'installed-packages' },
  { label: 'Product Options', slug: 'product-options' },
  { label: 'Product Comments', slug: 'product-comments' },
  { label: 'Product Pricing Options', slug: 'product-pricing-options' },
  { label: 'Product Aesthetics', slug: 'product-aesthetics' },
  { label: 'Product Capabilities', slug: 'product-capabilities' },
  { label: 'Product Categorization', slug: 'product-categorization' },
  { label: 'Reconditioning / PO Management', slug: 'reconditioning-po-management' },
  { label: 'Market Comparison Tools', slug: 'market-comparison-tools' },
  { label: 'Vehicle History Information', slug: 'vehicle-history-information' },
] as const;

export type VehicleDetailSectionSlug = typeof VEHICLE_DETAIL_SECTIONS[number]['slug'];

export const getVehicleDetailSectionLabel = (slug: string): string => {
  if (slug === 'product-pricing-options') {
    return 'Product Pricing Option';
  }

  const section = VEHICLE_DETAIL_SECTIONS.find((item) => item.slug === slug);
  return section?.label ?? 'Vehicle Details';
};
